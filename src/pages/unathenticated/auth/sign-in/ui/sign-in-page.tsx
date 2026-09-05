import { Globe, ShieldCheck, Zap } from "lucide-react";
import { SignInForm } from "./sign-in-form";

const highlights = [
  { icon: Zap, text: "50ms average execution" },
  { icon: ShieldCheck, text: "Segregated & regulated" },
  { icon: Globe, text: "Trade 24/5 worldwide" },
];

export function SignInPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#0b0e14] text-white">
      {/* Brand panel */}
      <div className="relative hidden flex-1 overflow-hidden bg-[#05070a] lg:flex lg:flex-col lg:justify-center lg:p-14">
        <div className="pointer-events-none absolute -top-32 -left-24 size-130 rounded-full bg-primary/20 blur-[130px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-size-[32px_32px]" />

        <div className="relative">
          <h2 className="max-w-md text-4xl font-black leading-tight tracking-tight xl:text-5xl">
            Welcome back to <span className="text-primary">BIG</span>
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Sign in to manage your portfolio, fund your account, and trade the
            world&apos;s markets.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {highlights.map((item) => (
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
        <SignInForm />
      </div>
    </div>
  );
}
