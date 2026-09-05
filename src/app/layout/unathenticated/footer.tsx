import { Link } from "@tanstack/react-router";
import { CandlestickChart } from "lucide-react";

const columns = [
  {
    title: "Trading",
    links: ["Forex", "Commodities", "Indices", "Crypto CFDs", "Spreads & Fees"],
  },
  {
    title: "Company",
    links: ["About BIG", "Careers", "Newsroom", "Partners", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Risk Disclosure", "AML Policy"],
  },
];

const socials = [
  { src: "/icon/facebook.png", label: "Facebook" },
  { src: "/icon/twitter.png", label: "Twitter" },
  { src: "/icon/instram.png", label: "Instagram" },
  { src: "/icon/youtube.png", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070a] px-6 pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CandlestickChart className="size-5" />
              </span>
              <span className="text-xl font-black tracking-tight">
                BIG<span className="text-primary">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Trade forex, metals, and indices with institutional pricing,
              ultra-low spreads, and lightning-fast execution.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10"
                >
                  <img src={social.src} alt={social.label} className="size-full object-contain" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-bold tracking-wide text-white/90 uppercase">
                {column.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/60 transition-colors hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/5 pt-6">
          <p className="text-xs leading-relaxed text-white/40">
            Risk warning: Trading leveraged products such as CFDs carries a high
            level of risk to your capital. You may lose more than your initial
            deposit. These products are not suitable for all investors; ensure
            you fully understand the risks and seek independent advice if
            necessary.
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} BIG Markets. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/sign-in" className="hover:text-white">Log In</Link>
              <Link to="/sign-up" className="hover:text-white">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
