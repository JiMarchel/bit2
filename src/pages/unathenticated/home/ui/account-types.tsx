import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Standard Account",
    deposit: "$10",
    popular: true,
    features: [
      ["Spread From 1.5 pip"],
      ["Maximum Leverage", "1:2000"],
      ["Minimum trade size", "0.01 Lot"],
      ["Commission", "No"],
      ["Swap", "No"],
    ],
  },
  {
    name: "ECN Account",
    deposit: "$500",
    popular: false,
    features: [
      ["Spread From 1.7 pip"],
      ["Maximum Leverage", "1:2000"],
      ["Minimum trade size", "0.01 Lot"],
      ["Commission", "Yes"],
      ["Swap", "No"],
    ],
  },
  {
    name: "PRO Account",
    deposit: "$1000",
    popular: false,
    features: [
      ["Spread From 0.5 pip"],
      ["Maximum Leverage", "1:2000"],
      ["Minimum trade size", "0.01 Lot"],
      ["Commission", "Yes"],
      ["Swap", "Yes"],
    ],
  },
];

export function AccountTypes() {
  return (
    <div className="bg-[#d9d9d9] py-20 pb-32 font-sans">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-bold text-black md:text-5xl tracking-tight">
          Explore Our Account Options
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-black/60 md:text-xl">
          Discover the most competitive prices in the market
          <br className="hidden md:block" /> updated regularly for your
          advantage.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6">
        <div className="mb-6 flex justify-start pl-2 md:pl-0">
          <div className="inline-flex rounded-full bg-[#05151c] px-7 py-2.5 text-xl font-medium text-white shadow-lg">
            Account Types
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-end">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex h-full flex-col rounded-xl bg-white text-left ${
                plan.popular
                  ? "border-[3px] border-primary shadow-xl"
                  : "shadow-md mt-10 md:mt-0"
              }`}
            >
              {plan.popular && (
                <div className="flex w-full items-center justify-center gap-1.5 rounded-t-lg bg-primary py-2 text-xs font-bold text-black uppercase tracking-wider">
                  Most Popular <Sparkles className="h-3.5 w-3.5 fill-black" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-8 pt-10">
                <h3 className="text-xl font-bold text-black">{plan.name}</h3>
                <p className="mt-1 text-sm text-black/60">
                  Min Opening Deposit
                </p>
                <div className="mt-4 text-4xl font-extrabold text-black tracking-tight">
                  {plan.deposit}
                </div>

                <button className="mt-8 w-full rounded-md bg-primary py-3 text-sm font-bold text-black transition-colors hover:bg-primary/80 active:scale-[0.98]">
                  Get started
                </button>

                <ul className="mt-10 flex flex-1 flex-col gap-5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-black"
                        strokeWidth={2}
                      />
                      <div className="flex flex-col text-sm font-medium text-black/80 leading-tight">
                        {feature.map((line, i) => (
                          <span key={i}>{line}</span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
