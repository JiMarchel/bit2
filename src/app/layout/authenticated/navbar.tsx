import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  Copy,
  Home,
  LineChart,
  LogOut,
  Menu,
  TrendingUp,
  User2,
  Users,
  Wallet,
  WalletMinimal,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { ModeToggle } from "../mode-toggle";

type NavChild = { label: string; to: string; icon: typeof Home };
type NavItem = {
  label: string;
  to?: string;
  icon: typeof Home;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Account", to: "/account", icon: Wallet },
  { label: "Copy Trading", to: "/copy-trading", icon: Copy },
  {
    label: "Financial",
    icon: TrendingUp,
    children: [
      { label: "My Wallet", to: "/my-wallet", icon: WalletMinimal },
      { label: "Deposit", to: "/deposit", icon: ArrowDownToLine },
      { label: "Withdrawal", to: "/withdrawal", icon: ArrowUpFromLine },
      { label: "Internal Transfer", to: "/internal-transfer", icon: ArrowRightLeft },
    ],
  },
  { label: "IB", to: "/ib", icon: Users },
  { label: "Market Analysis", to: "/market-analysis", icon: LineChart },
];

export function AuthenticatedNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate({ to: "/sign-in" });
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-muted-3 px-6 py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between lg:grid lg:grid-cols-3">
        {/* Col 1: Logo */}
        <Link to="/dashboard" className="justify-self-start">
          <img src="/logo.png" alt="AGL Market" className="h-10 w-auto" />
        </Link>

        {/* Col 2: Navigation */}
        <div className="hidden items-center justify-self-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <NavigationMenu key={item.label}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-1.5 bg-transparent text-white/70 hover:bg-white/10 hover:text-white focus:bg-white/10 data-popup-open:bg-white/10 data-popup-open:text-white">
                      <item.icon className="h-5 w-5" /> {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-56 gap-1">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <NavigationMenuLink
                              render={
                                <Link
                                  to={child.to}
                                  activeProps={{ className: "bg-muted/60" }}
                                />
                              }
                            >
                              <child.icon className="size-4" />
                              {child.label}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "text-white/70 hover:bg-white/10 hover:text-white",
                )}
                activeProps={{ className: "bg-white/10 text-white" }}
              >
                <item.icon className="h-5 w-5" /> {item.label}
              </Link>
            ),
          )}
        </div>

        {/* Col 3: Mobile menu + avatar dropdown */}
        <div className="flex items-center justify-self-end gap-2">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    size="icon-lg"
                    className="h-auto w-auto border-none bg-muted-3 p-0 text-white hover:bg-muted-3 focus:ring-0"
                  />
                }
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[80%] max-w-87.5 border-r border-white/10 bg-[#18181b] p-6 text-white"
              >
                <SheetHeader className="mb-10 text-left">
                  <SheetTitle>
                    <img src="/logo.png" alt="AGL Market" className="h-10 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {navItems.map((item) =>
                    item.children ? (
                      <div key={item.label} className="flex flex-col">
                        <p className="px-4 pt-3 pb-1 text-xs font-semibold tracking-wide text-white/40 uppercase">
                          {item.label}
                        </p>
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                            activeProps={{ className: "bg-white/10 text-white font-semibold" }}
                          >
                            <child.icon className="size-4" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                        activeProps={{ className: "bg-white/10 text-white font-semibold" }}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <Avatar>
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link to="/profile" />}>
                  <User2 />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
