import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Trading", to: "/trading" },
  { label: "Platform", to: "/platform" },
  // { label: "Education", to: "#" },
  // { label: "Company", to: "#" },
  // { label: "Contact Us", to: "#" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-muted-3 text-white px-6 py-2 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="AGL Market" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2 py-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              activeProps={{ className: "text-white bg-white/10" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" size="lg" className="text-black bg-white hover:bg-white/90">
            <Link to="/sign-in">
              Log In
            </Link>
          </Button>
          <Button
            className="bg-primary text-black hover:bg-primary/90"
            size="lg"
          >
            <Link to="/sign-up">
              Sign Up
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation (Sheet) */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <Button size="icon-lg" className="text-white bg-muted-3 hover:bg-muted-3 cursor-pointer border-none p-0 h-auto w-auto focus:ring-0">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#18181b] border-r border-white/10 text-white p-6 w-[80%] max-w-87.5">
              <SheetHeader className="mb-10 text-left">
                <SheetTitle>
                  <img src="/logo.png" alt="AGL Market" className="h-10 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-lg px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    activeProps={{ className: "text-white bg-white/10 font-semibold" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button variant="outline" className="w-full text-black border-white/20 hover:bg-white py-6 text-base" size="lg">
                  <Link to="/sign-in">
                    Log In
                  </Link>
                </Button>
                <Button className="w-full bg-primary text-black hover:bg-primary/90 py-6 text-base font-bold" size="lg">
                  <Link to="/sign-up">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
