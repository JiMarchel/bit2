import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@/shared/ui";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Plus } from "lucide-react";

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
                  <CardDescription>{item.accountType}</CardDescription>
                </div>
              </div>
              <Badge>{item.status}</Badge>
            </CardHeader>
          </Card>
        ))}

      </div>
    </div>
  );
}
