import { Link } from "@tanstack/react-router";
import { Check, MonitorSmartphone } from "lucide-react";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const points = [
  "Native apps for iOS and Android",
  "MetaTrader 5 and BIG WebTrader",
  "Advanced charts with 80+ indicators",
  "One-tap trading and price alerts",
];

export function Platforms() {
  return (
    <section id="platforms" className="bg-[#05070a] px-6 py-20 text-white lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto size-3/4 self-center rounded-full bg-primary/15 blur-[120px]" />
          <img
            src="/Double-Phone.webp"
            alt="BIG trading app"
            className="mx-auto w-full max-w-md object-contain drop-shadow-2xl"
          />
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <MonitorSmartphone className="size-4" />
            Platforms
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Trade anywhere, on any device
          </h2>
          <p className="mt-4 max-w-lg text-white/60">
            Seamlessly switch between desktop, web, and mobile. Your positions,
            watchlists, and alerts stay in sync everywhere.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-white/75">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/sign-up"
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              Create free account
            </Link>
            <span className="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-2">
              <img src="/meta5.png" alt="MetaTrader 5" className="h-7 w-auto object-contain" />
              <span className="text-sm text-white/60">MetaTrader 5 ready</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
