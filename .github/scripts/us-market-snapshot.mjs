#!/usr/bin/env node
// US market snapshot — the US twin of market-snapshot.mjs. Fetches today's quote and a month of daily closes for every
// US stock and ETF the app shows, plus the S&P 500 / NASDAQ / Dow Jones, from Yahoo Finance's public chart endpoint
// (no key), and writes src/shared/data/us-market-snapshot.json. `src/shared/data/usStocks.ts` reads it, so US prices
// and day changes are real (as of the snapshot); `src/shared/data/live.ts` makes them tick around that level.
//
//   npm run us:snapshot              (about 30 s; Yahoo is asked one symbol at a time)
//   node us-market-snapshot.mjs <file>  (refresh another copy in place: the symbols come from the file's `symbols`)
//
// Symbols: every `sym: 'X'` / `symbol: 'X'` in the US data files below, the shared catalogue's keys, and every logo
// in src/shared/assets/us-logos. A symbol that fails keeps its previous numbers; if every one fails, nothing is written.
// Market caps aren't here (Yahoo's quote endpoint needs a login now) — the screens keep their own cap figures.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = process.argv[2] ? resolve(process.argv[2]) : resolve(root, 'src/shared/data/us-market-snapshot.json')
const previous = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : { quotes: {} }

const DATA_FILES = [
  'src/shared/data/usStocks.ts',
  'src/flows/stocks/components/us/data.ts',
  'src/flows/us-stocks/screens/etf/data.ts',
  'src/flows/us-stocks/screens/activation/data.ts',
  'src/flows/us-stocks/screens/entry/portfolioData.ts',
  'src/flows/us-stocks/screens/entry/spxData.ts',
]
function symbolsFromSource() {
  const found = new Set()
  for (const file of DATA_FILES) {
    const path = resolve(root, file)
    if (!existsSync(path)) continue
    const src = readFileSync(path, 'utf8')
    for (const m of src.matchAll(/\b(?:sym|symbol): '([A-Z][A-Z.]{0,5})'/g)) found.add(m[1])
    // The catalogue's keys: `  NVDA: { name: …`
    if (file.endsWith('usStocks.ts')) for (const m of src.matchAll(/^ {2}([A-Z][A-Z.]{0,5}): \{ name:/gm)) found.add(m[1])
  }
  for (const f of readdirSync(resolve(root, 'src/shared/assets/us-logos'))) if (f.endsWith('.png')) found.add(f.slice(0, -4))
  return [...found].sort()
}
const symbols = process.argv[2] ? previous.symbols ?? Object.keys(previous.quotes) : symbolsFromSource()

// App index id → Yahoo symbol. The ids match src/flows/stocks/components/us/data.ts `usIndices`.
const INDICES = { 'sp-500': '^GSPC', nasdaq: '^IXIC', 'dow-jones': '^DJI' }
// Exchange rates (id → Yahoo symbol): the app's USD → INR rate (src/shared/money.ts) shows every $ value in ₹ too.
const FX = { usdInr: 'USDINR=X' }

const UA = { 'User-Agent': 'Mozilla/5.0' }
const round = (n) => (n == null ? null : Math.round(n * 100) / 100)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
// Yahoo's exchange names → the ones the app shows.
const EXCHANGE = { NasdaqGS: 'NASDAQ', NasdaqGM: 'NASDAQ', NasdaqCM: 'NASDAQ', NYSE: 'NYSE', NYSEArca: 'NYSE ARCA', 'NYSE American': 'NYSE AMERICAN', BATS: 'CBOE' }

async function quote(ticker) {
  const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1mo&interval=1d`, { headers: UA })
  if (!res.ok) throw new Error(`chart ${res.status}`)
  const r = (await res.json()).chart.result?.[0]
  if (!r) throw new Error('no chart result')
  const m = r.meta
  const closes = (r.timestamp ?? [])
    .map((t, i) => ({ date: new Date(t * 1000).toISOString().slice(0, 10), close: round(r.indicators.quote[0].close[i]) }))
    .filter((p) => p.close != null)
  const session = new Date(m.regularMarketTime * 1000).toISOString().slice(0, 10)
  const prevClose = closes.findLast((p) => p.date < session)?.close ?? m.chartPreviousClose
  const price = round(m.regularMarketPrice)
  return {
    name: m.longName ?? m.shortName ?? null,
    exchange: EXCHANGE[m.fullExchangeName] ?? m.fullExchangeName ?? null,
    type: m.instrumentType ?? null,
    price,
    open: round(r.indicators.quote[0].open?.findLast((o) => o != null)),
    prevClose: round(prevClose),
    change: round(price - prevClose),
    changePct: round(((price - prevClose) / prevClose) * 100),
    dayHigh: round(m.regularMarketDayHigh),
    dayLow: round(m.regularMarketDayLow),
    high52: round(m.fiftyTwoWeekHigh),
    low52: round(m.fiftyTwoWeekLow),
    volume: m.regularMarketVolume ?? null,
    closes: closes.map((p) => p.close),
  }
}

const quotes = {}
const failed = []
for (const symbol of symbols) {
  try {
    quotes[symbol] = await quote(symbol)
    process.stdout.write('.')
  } catch (e) {
    failed.push(`${symbol} (${e.message})`)
    process.stdout.write('x')
    if (previous.quotes[symbol]) quotes[symbol] = previous.quotes[symbol]
  }
  await sleep(200)
}
if (failed.length === symbols.length) {
  console.error(`\nEvery symbol failed — ${out} left as it was.`)
  process.exit(1)
}

const indices = {}
for (const [id, ticker] of Object.entries(INDICES)) {
  try {
    const { closes, volume, name, exchange, type, ...q } = await quote(ticker)
    indices[id] = { symbol: ticker, ...q }
  } catch (e) {
    failed.push(`${id} (${e.message})`)
    if (previous.indices?.[id]) indices[id] = previous.indices[id]
  }
  await sleep(200)
}

const fx = {}
for (const [id, ticker] of Object.entries(FX)) {
  try {
    const { closes, volume, name, exchange, type, ...q } = await quote(ticker)
    fx[id] = { symbol: ticker, ...q }
  } catch (e) {
    failed.push(`${id} (${e.message})`)
    if (previous.fx?.[id]) fx[id] = previous.fx[id]
  }
}

const snapshot = { source: 'Yahoo Finance (public chart endpoint)', fetchedAt: new Date().toISOString(), symbols, quotes, indices, fx }
writeFileSync(out, JSON.stringify(snapshot, null, 1) + '\n')
console.log(`\n${symbols.length - failed.filter((f) => !f.includes('-')).length}/${symbols.length} symbols → ${out.replace(root + '/', '')}`)
if (failed.length) console.log('Failed (kept previous):', failed.join(', '))
