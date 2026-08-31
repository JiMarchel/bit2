import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/ui";
import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export function BalanceCard() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {USERS_ACCOUNTS.map((item) => (
          <Card
            key={item.login}
          >
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>{item.login}</CardTitle>
                <CardDescription>{item.accountType}</CardDescription>
              </div>
              <Avatar>
                <AvatarImage src="/meta5.png" />
                <AvatarFallback>MT5</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex justify-between">
              <p className="font-semibold text-lg">{item.balance}</p>
              <Button size="sm" variant="link">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
