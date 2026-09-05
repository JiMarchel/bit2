import { BadgeDollarSign, Rocket, Wallet } from "lucide-react";
import { SignUpForm } from "./sign-up-form";

const perks = [
  { icon: Rocket, text: "Open an account in minutes" },
  { icon: Wallet, text: "Start from just $10" },
  { icon: BadgeDollarSign, text: "Zero-commission Standard account" },
];

export function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#0b0e14] text-white">
      {/* Brand panel */}
      <div className="relative hidden flex-1 overflow-hidden bg-[#05070a] lg:flex lg:flex-col lg:justify-center lg:p-14">
        <div className="pointer-events-none absolute -bottom-32 -right-24 size-130 rounded-full bg-primary/20 blur-[130px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-size-[32px_32px]" />

        <div className="relative">
          <h2 className="max-w-md text-4xl font-black leading-tight tracking-tight xl:text-5xl">
            Join <span className="text-primary">2M+</span> traders on BIG
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Create your free account and get instant access to global markets
            with institutional pricing.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {perks.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4" />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="absolute bottom-14 left-14 text-xs text-white/40">
          © {new Date().getFullYear()} BIG Markets. Trading involves risk.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <SignUpForm />
      </div>
    </div>
  );
}
