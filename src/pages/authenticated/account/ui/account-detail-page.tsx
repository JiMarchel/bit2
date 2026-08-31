import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUp, LineChart, Wallet } from "lucide-react";
import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChangePasswordDialog } from "./change-password-dialog";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-card-foreground">{value}</span>
    </div>
  );
}

export function AccountDetailPage({ id }: { id: string }) {
  const account = USERS_ACCOUNTS.find((item) => item.id === id);

  if (!account) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-card-foreground">Account not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No MT5 account with id {id}.
        </p>
        <Link
          to="/account"
          className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
        >
          <ArrowLeft />
          Back to accounts
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Balance", value: account.balance, icon: Wallet, tone: "text-emerald-600" },
    { label: "Equity", value: account.equity, icon: LineChart, tone: "text-sky-600" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-6">
      <Link
        to="/account"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to accounts
      </Link>

      {/* Header */}
      <Card className="shadow-sm">
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src="/meta5.png" />
              <AvatarFallback>MT5</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-card-foreground">{account.login}</h1>
                <Badge className="bg-emerald-50 text-emerald-600">{account.status}</Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{account.accountType}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-emerald-500 text-white hover:bg-emerald-500/90">
              <ArrowDown className="size-4" />
              Deposit
            </Button>
            <Button variant="outline">
              <ArrowUp className="size-4" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`mt-1 text-2xl font-bold ${stat.tone}`}>{stat.value}</p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <stat.icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4">
        {/* Account information */}
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            <InfoRow label="Login" value={account.login} />
            <InfoRow label="Account Type" value={account.accountType} />
            <InfoRow label="Rate" value={account.rate} />
            <InfoRow label="Leverage" value={account.leverage} />
            <InfoRow label="Status" value={account.status} />
            <InfoRow label="Platform" value="MetaTrader 5" />
          </CardContent>
        </Card>

        {/* Management */}
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Management
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <ChangePasswordDialog login={account.login} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
