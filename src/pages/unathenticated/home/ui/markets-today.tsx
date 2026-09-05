const markets = [
  { pair: "EUR/USD", base: "eu", quote: "us", price: "1.10842", change: "+0.42%", up: true },
  { pair: "GBP/USD", base: "gb", quote: "us", price: "1.27310", change: "-0.18%", up: false },
  { pair: "USD/JPY", base: "us", quote: "jp", price: "159.480", change: "+0.31%", up: true },
  { pair: "AUD/USD", base: "au", quote: "us", price: "0.66120", change: "+0.09%", up: true },
  { pair: "USD/CAD", base: "us", quote: "ca", price: "1.36940", change: "-0.22%", up: false },
  { pair: "USD/CHF", base: "us", quote: "ch", price: "0.89310", change: "+0.14%", up: true },
];

const UP_PATH = "M0,26 L20,22 L40,24 L60,14 L80,18 L100,8 L120,12 L140,4";
const DOWN_PATH = "M0,6 L20,10 L40,8 L60,18 L80,14 L100,22 L120,18 L140,26";

export function LiveMarkets() {
  return (
    <section id="markets" className="bg-[#080a10] px-6 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold text-primary">Live markets</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Thousands of instruments, one account
            </h2>
          </div>
          <span className="flex items-center gap-2 text-sm text-white/50">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            Prices update in real time
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((market) => (
            <div
              key={market.pair}
              className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-primary/40 hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={`/flags/${market.base}.svg`} alt="" className="size-6 rounded-full object-cover" />
                  <img
                    src={`/flags/${market.quote}.svg`}
                    alt=""
                    className="-ml-3 size-6 rounded-full object-cover ring-2 ring-[#080a10]"
                  />
                  <span className="ml-1 font-bold">{market.pair}</span>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    market.up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
                  }`}
                >
                  {market.change}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <span className="text-2xl font-bold tabular-nums">{market.price}</span>
                <svg viewBox="0 0 140 30" className="h-8 w-28" preserveAspectRatio="none">
                  <path
                    d={market.up ? UP_PATH : DOWN_PATH}
                    fill="none"
                    strokeWidth="2"
                    className={market.up ? "stroke-emerald-400" : "stroke-rose-400"}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
