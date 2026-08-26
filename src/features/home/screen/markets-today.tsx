import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from '#/components/ui/avatar'

interface Item {
  symbol: string
  price: number
  change: number
  changePercent: number
  icons: string[]
}

const ITEMS: Item[] = [
  { symbol: "SPX500", price: 5782.45, change: 32.15, changePercent: 0.56, icons: ["/symbol/spx500.svg"] },
  { symbol: "NAS100", price: 20453.80, change: -12.40, changePercent: -0.06, icons: ["/symbol/US.svg"] },
  { symbol: "GER40", price: 18672.30, change: 78.60, changePercent: 0.42, icons: ["/symbol/dax.svg"] },
  { symbol: "UK100", price: 8234.15, change: -5.25, changePercent: -0.06, icons: ["/symbol/uk-100.svg"] },
  { symbol: "JPN225", price: 40123.50, change: 215.30, changePercent: 0.54, icons: ["/symbol/nikkei-225.svg"] },
  { symbol: "EURUSD", price: 1.0834, change: 0.0024, changePercent: 0.22, icons: ["/symbol/EU.svg", "/symbol/US.svg"] },
  { symbol: "USDJPY", price: 156.78, change: -0.45, changePercent: -0.29, icons: ["/symbol/US.svg", "/symbol/JP.svg"] },
  { symbol: "XAUUSD", price: 2398.60, change: 14.80, changePercent: 0.62, icons: ["/symbol/xauusd.svg"] },
  { symbol: "BTCUSD", price: 67450.00, change: 1230.00, changePercent: 1.86, icons: ["/symbol/btc.svg"] },
  { symbol: "ETHUSD", price: 3456.20, change: 89.50, changePercent: 2.66, icons: ["/symbol/eth.svg"] },
]

function Icon({ icons }: { icons: string[] }) {
  if (icons.length === 1) {
    return (
      <Avatar size="sm">
        <AvatarImage src={icons[0]} />
        <AvatarFallback>{icons[0].slice(8, 10).toUpperCase()}</AvatarFallback>
      </Avatar>
    )
  }
  return (
    <AvatarGroup>
      {icons.map((src) => (
        <Avatar key={src} size="sm">
          <AvatarImage src={src} />
          <AvatarFallback>{src.slice(8, 10).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}

function Card({ symbol, price, change, changePercent, icons }: Item) {
  const isUp = change >= 0
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-secondary px-5 py-3">
      <Icon icons={icons} />
      <div>
        <p className="text-sm font-semibold text-white">{symbol}</p>
        <p className="text-xs text-white/60">${price.toLocaleString()}</p>
      </div>
      <div className="ml-2 text-right">
        <p className={`text-sm font-medium ${isUp ? 'text-green-400' : 'text-red-400'}`}>
          {isUp ? '+' : ''}{change.toFixed(2)}
        </p>
        <p className={`text-xs ${isUp ? 'text-green-400' : 'text-red-400'}`}>
          {isUp ? '+' : ''}{changePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

export function MarketsToday() {
  return (
    <div className="overflow-hidden bg-secondary py-3">
      <div className="flex animate-marquee gap-4" style={{ width: 'max-content' }}>
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  )
}