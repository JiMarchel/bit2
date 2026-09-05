import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const tiers = [
  {
    name: "Standard",
    tagline: "For getting started",
    minDeposit: "$10",
    highlight: false,
    specs: ["Spreads from 1.0 pip", "Zero commission", "Leverage up to 1:200", "All instruments"],
  },
  {
    name: "Pro",
    tagline: "For active traders",
    minDeposit: "$500",
    highlight: true,
    specs: ["Spreads from 0.2 pips", "$3.5 / lot commission", "Leverage up to 1:500", "Priority execution", "Dedicated manager"],
  },
  {
    name: "VIP",
    tagline: "For high volume",
    minDeposit: "$25,000",
    highlight: false,
    specs: ["Spreads from 0.0 pips", "Rebate program", "Leverage up to 1:500", "VPS hosting", "24/7 concierge"],
  },
];

export function AccountTypes() {
  return (
    <section id="accounts" className="bg-[#080a10] px-6 py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">Account types</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Choose the account that fits you
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                tier.highlight
                  ? "border-primary/50 bg-primary/6 shadow-[0_0_40px_-12px_var(--color-primary)]"
                  : "border-white/10 bg-white/3",
              )}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="mt-1 text-sm text-white/50">{tier.tagline}</p>
              <div className="mt-5 flex items-end gap-1.5">
                <span className="text-3xl font-black">{tier.minDeposit}</span>
                <span className="pb-1 text-sm text-white/50">min. deposit</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2.5 text-sm text-white/70">
                    <Check className="size-4 shrink-0 text-primary" />
                    {spec}
                  </li>
                ))}
              </ul>

              <Link
                to="/sign-up"
                className={cn(
                  buttonVariants({ variant: tier.highlight ? "default" : "outline", size: "lg" }),
                  "mt-8 w-full font-semibold",
                  !tier.highlight && "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                Open {tier.name} account
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
