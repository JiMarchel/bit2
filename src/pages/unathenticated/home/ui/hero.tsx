import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const stats = [
  { value: "0.0", label: "Spreads from pips" },
  { value: "1:500", label: "Max leverage" },
  { value: "50ms", label: "Avg. execution" },
  { value: "2M+", label: "Active traders" },
];

const trust = [
  { icon: Zap, text: "Instant execution" },
  { icon: ShieldCheck, text: "Regulated & secure" },
  { icon: TrendingUp, text: "24/5 global markets" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#05070a] px-6 pt-16 pb-20 text-white lg:pt-24 lg:pb-28"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 size-160 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-size-[32px_32px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            New: zero-commission Standard accounts
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Trade the world&apos;s markets with{" "}
            <span className="text-primary">BIG</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/65">
            Forex, gold, indices, and crypto CFDs — institutional pricing,
            ultra-low spreads, and execution measured in milliseconds.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/sign-up"
              className={cn(buttonVariants({ size: "lg" }), "h-12 gap-1.5 px-6 text-base font-semibold")}
            >
              Start trading
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href="#markets"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Explore markets
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trust.map((item) => (
              <span key={item.text} className="flex items-center gap-2 text-sm text-white/60">
                <item.icon className="size-4 text-primary" />
                {item.text}
              </span>
            ))}
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trading card mock */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/flags/eu.svg" alt="EUR" className="size-6 rounded-full object-cover" />
                <img src="/flags/us.svg" alt="USD" className="-ml-3 size-6 rounded-full object-cover ring-2 ring-[#0b0e14]" />
                <span className="ml-1 font-bold">EUR/USD</span>
              </div>
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                +0.42%
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold">1.10842</span>
              <span className="text-sm text-white/50">Bid / Ask 1.10840 · 1.10844</span>
            </div>

            <svg viewBox="0 0 320 90" className="mt-4 h-24 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 L30,60 L60,64 L90,44 L120,52 L150,30 L180,40 L210,22 L240,34 L270,16 L300,24 L320,10"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
              />
              <path
                d="M0,70 L30,60 L60,64 L90,44 L120,52 L150,30 L180,40 L210,22 L240,34 L270,16 L300,24 L320,10 L320,90 L0,90 Z"
                fill="url(#heroFill)"
              />
            </svg>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-500/10 py-2.5 text-center">
                <p className="text-xs text-emerald-400/80">Buy</p>
                <p className="font-bold text-emerald-400">1.10844</p>
              </div>
              <div className="rounded-xl bg-rose-500/10 py-2.5 text-center">
                <p className="text-xs text-rose-400/80">Sell</p>
                <p className="font-bold text-rose-400">1.10840</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-white/10 bg-[#0b0e14] px-4 py-3 shadow-xl sm:block">
            <p className="text-xs text-white/50">XAU/USD</p>
            <p className="flex items-center gap-2 font-bold">
              2,412.30
              <span className="text-xs font-semibold text-emerald-400">+1.08%</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
