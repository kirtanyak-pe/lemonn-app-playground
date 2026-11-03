#!/usr/bin/env node
// Market snapshot — fetches today's quote and 3 months of daily closes for every company in the catalogue from
// Yahoo Finance's public chart endpoint (no key), plus each company's sector / industry, and today's value of the
// market indices (INDICES below — the Stocks home's index strip), and writes src/shared/data/market-snapshot.json.
// The prototype reads that file, so prices look real without a live feed.
//
//   npm run market:snapshot          (all companies — about a minute; Yahoo is asked one symbol at a time)
//
//   node market-snapshot.mjs <file>  (refresh another copy in place — the published site's GitHub Action does this;
//                                     the symbols then come from the file's own `symbols` list)
//
// Why a file and not a live call: Yahoo sends no CORS header, so a page on GitHub Pages can't call it from the
// browser. The build publishes this file next to the page (market-snapshot.json) and the app re-reads it at runtime,
// so a scheduled job on the site repo can refresh prices without a rebuild (.github/workflows/market-snapshot.yml).
// A symbol or index that fails keeps its previous numbers; if every company fails, nothing is written.
// Indices are listed here, not read from the file, so an older published file without `indices` gains them on its next
// refresh. They go under their own `indices` key (by the app's index id), so `symbols` / `quotes` stay companies only.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = process.argv[2] ? resolve(process.argv[2]) : resolve(root, 'src/shared/data/market-snapshot.json')
const previous = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : { quotes: {} }
const cataloguePath = resolve(root, 'src/shared/data/companies.ts')
const symbols = process.argv[2]
  ? previous.symbols ?? Object.keys(previous.quotes)
  : [...readFileSync(cataloguePath, 'utf8').matchAll(/^ {2}'?([A-Z&-]+)'?: company\(/gm)].map((m) => m[1])

// App index id → Yahoo symbol (indices have no ".NS" suffix). The id matches src/shared/data/market.ts `indices`.
const INDICES = { 'nifty-50': '^NSEI', sensex: '^BSESN', 'nifty-bank': '^NSEBANK' }

const UA = { 'User-Agent': 'Mozilla/5.0' }
const yahoo = (symbol) => encodeURIComponent(`${symbol}.NS`)
const round = (n) => (n == null ? null : Math.round(n * 100) / 100)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function quote(symbol, ticker = yahoo(symbol)) {
  const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=3mo&interval=1d`, { headers: UA })
  if (!res.ok) throw new Error(`chart ${res.status}`)
  const r = (await res.json()).chart.result?.[0]
  if (!r) throw new Error('no chart result')
  const m = r.meta
  const closes = r.timestamp
    .map((t, i) => ({ date: new Date(t * 1000).toISOString().slice(0, 10), close: round(r.indicators.quote[0].close[i]) }))
    .filter((p) => p.close != null)
  // Yesterday's close = the last daily close dated before today's session. Yahoo often leaves today's daily bar (and
  // sometimes a recent index bar) empty, so "the second-to-last close" can land a day too early.
  const session = new Date(m.regularMarketTime * 1000).toISOString().slice(0, 10)
  const prevClose = closes.findLast((p) => p.date < session)?.close ?? m.chartPreviousClose
  const price = round(m.regularMarketPrice)
  return {
    price,
    prevClose: round(prevClose),
    change: round(price - prevClose),
    changePct: round(((price - prevClose) / prevClose) * 100),
    dayHigh: round(m.regularMarketDayHigh),
    dayLow: round(m.regularMarketDayLow),
    high52: round(m.fiftyTwoWeekHigh),
    low52: round(m.fiftyTwoWeekLow),
    volume: m.regularMarketVolume ?? null,
    longName: m.longName ?? null,
    closes,
  }
}

async function profile(symbol) {
  const res = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${yahoo(symbol)}&quotesCount=1&newsCount=0`, { headers: UA })
  if (!res.ok) return {}
  const q = (await res.json()).quotes?.[0] ?? {}
  return { sector: q.sector ?? null, industry: q.industry ?? null }
}

const quotes = {}
const failed = []
for (const symbol of symbols) {
  try {
    quotes[symbol] = { ...(await quote(symbol)), ...(await profile(symbol)) }
    process.stdout.write('.')
  } catch (e) {
    failed.push(`${symbol} (${e.message})`)
    process.stdout.write('x')
  }
  await sleep(250)
}
if (!Object.keys(quotes).length) {
  console.error(`\nEvery symbol failed — ${out} left as it was.`, failed.join(', '))
  process.exit(1)
}
// Failed symbols keep the last numbers we had for them.
for (const symbol of symbols) if (!quotes[symbol] && previous.quotes[symbol]) quotes[symbol] = previous.quotes[symbol]

// Indices: today's value and change only (the strip shows no chart), so the 3 months of closes are dropped.
const indices = {}
const failedIndices = []
for (const [id, ticker] of Object.entries(INDICES)) {
  try {
    const { closes, volume, longName, ...q } = await quote(id, encodeURIComponent(ticker))
    indices[id] = { symbol: ticker, ...q }
  } catch (e) {
    failedIndices.push(`${id} (${e.message})`)
    if (previous.indices?.[id]) indices[id] = previous.indices[id]
  }
  await sleep(250)
}

const snapshot = { source: 'Yahoo Finance (public chart + search endpoints)', fetchedAt: new Date().toISOString(), symbols, quotes, indices }
writeFileSync(out, JSON.stringify(snapshot, null, 1) + '\n')
console.log(`\n${symbols.length - failed.length}/${symbols.length} companies, ${Object.keys(INDICES).length - failedIndices.length}/${Object.keys(INDICES).length} indices refreshed → ${out.replace(root + '/', '')}`)
if (failed.length || failedIndices.length) console.log('Failed (kept previous):', [...failed, ...failedIndices].join(', '))
