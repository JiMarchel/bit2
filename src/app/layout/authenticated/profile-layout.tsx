import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  Bitcoin,
  Gift,
  LogOut,
  Receipt,
  ShieldCheck,
  User,
  UserCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, Badge, Button, buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const profileTabs = [
  { label: "My profile", to: "/profile", icon: User },
  { label: "Banks", to: "/profile/banks", icon: Banknote },
  { label: "Crypto", to: "/profile/crypto", icon: Bitcoin },
  { label: "Security", to: "/profile/security", icon: ShieldCheck },
  { label: "Transactions", to: "/profile/transactions", icon: Receipt },
  { label: "Kyc", to: "/profile/kyc", icon: UserCheck },
  { label: "Referral", to: "/profile/referral", icon: Gift },
];

export function ProfileLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate({ to: "/sign-in" });
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-muted/40 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="size-14">
              <AvatarFallback className="text-base font-semibold">
                TU
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-card-foreground">tumini</p>
              <Badge className="mt-1 bg-emerald-600 text-white hover:bg-emerald-600">
                Agent
              </Badge>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-1">
            {profileTabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                activeOptions={{ exact: tab.to === "/profile" }}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "text-muted-foreground hover:text-foreground"
                )}
                activeProps={{
                  className: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                }}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              Logout
            </Button>
          </nav>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
