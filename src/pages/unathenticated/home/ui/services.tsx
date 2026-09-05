import {
  Banknote,
  Gauge,
  Globe,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Ultra-low spreads",
    description: "Raw institutional pricing from 0.0 pips with transparent, low commissions.",
  },
  {
    icon: Zap,
    title: "Lightning execution",
    description: "Orders filled in ~50ms with deep liquidity and zero requotes.",
  },
  {
    icon: Layers,
    title: "Leverage up to 1:500",
    description: "Flexible leverage to match your strategy and risk appetite.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    description: "Segregated client funds, 2FA, and encryption on every transaction.",
  },
  {
    icon: Banknote,
    title: "Instant funding",
    description: "Deposit and withdraw in seconds via cards, banks, and crypto.",
  },
  {
    icon: Globe,
    title: "24/5 global markets",
    description: "Trade forex, metals, indices, and crypto CFDs around the clock.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[#05070a] px-6 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">Why BIG</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for traders who demand more
          </h2>
          <p className="mt-4 text-white/60">
            Everything you need to trade with confidence — pricing, speed, and
            protection at an institutional standard.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
