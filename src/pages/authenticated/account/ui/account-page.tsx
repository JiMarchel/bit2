import { Link } from "@tanstack/react-router";
import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Plus, Settings } from "lucide-react";

export function AccountPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>

          <h1 className="text-3xl font-bold">MT5 Accounts</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your trading accounts and monitor your real-time balances.
          </p>
        </div>
        <Button size="lg"><Plus /> Add New Account</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {USERS_ACCOUNTS.map((item) => (
          <Card key={item.login}>
            <CardHeader className="flex justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/meta5.png" />
                  <AvatarFallback>MT5</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{item.login}</CardTitle>
                  <CardDescription>{item.rate} Rate</CardDescription>
                </div>
              </div>
              <Badge>{item.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3 border-b pb-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base font-semibold">Account Type</span>
                  <span className="sm:text-base text-sm font-semibold text-end">{item.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base font-semibold">Leverage</span>
                  <span className="sm:text-base text-sm font-semibold">{item.leverage}</span>
                </div>
              </div>
              <div className="space-y-3 grid grid-cols-2">
                <div className="flex flex-col items-center ">
                  <span className="text-muted-foreground text-sm font-semibold">Balance</span>
                  <span className="sm:text-base md:text-lg text-sm font-semibold">{item.balance}</span>
                </div>
                <div className="flex flex-col items-center ">
                  <span className="text-muted-foreground text-sm font-semibold">Equity</span>
                  <span className="sm:text-base md:text-lg text-sm font-semibold">{item.equity}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                to="/account/$id"
                params={{ id: item.id }}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full",
                )}
              >
                <Settings />
                Account Details
              </Link>
            </CardFooter>
          </Card>
        ))}

      </div>
    </div>
  );
}
