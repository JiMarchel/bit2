import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@/shared/ui";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { CandlestickChart, Menu } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const navItems = [
  { label: "Markets", to: "/#markets" },
  { label: "Why BIG", to: "/#features" },
  { label: "Accounts", to: "/#accounts" },
  { label: "Platforms", to: "/#platforms" },
];

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <CandlestickChart className="size-5" />
      </span>
      <span className="text-xl font-black tracking-tight text-white">
        BIG<span className="text-primary">.</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070a]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <BrandMark />

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "text-white hover:bg-white/10 hover:text-white",
            )}
          >
            Log In
          </Link>
          <Link
            to="/sign-up"
            className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  size="icon-lg"
                  className="h-auto w-auto border-none bg-transparent p-0 text-white hover:bg-transparent focus:ring-0"
                />
              }
            >
              <Menu className="h-7 w-7" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[82%] max-w-87.5 border-l border-white/10 bg-[#05070a] p-6 text-white"
            >
              <SheetHeader className="mb-8 text-left">
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    className="rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  Log In
                </Link>
                <Link
                  to="/sign-up"
                  className={cn(buttonVariants({ size: "lg" }), "w-full font-semibold")}
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
