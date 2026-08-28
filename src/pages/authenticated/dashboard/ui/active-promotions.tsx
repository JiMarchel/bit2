import { Badge} from "@/shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export function ActivePromotions() {
    const DATA = [
        {
            title: "Deposit 100 USD to get 10% bonus",
            description: "Deposit a minimum of 100 USD to get a 10% bonus. Use bonus code: BONUS10",
            createdAt: "2026-08-19"
        },
        {
            title: "$100 Instant Bonus for New Users",
            description: "Get a $100 instant bonus when you open a new account and make your first deposit.",
            createdAt: "2026-08-18"
        },
        {
            title: "Weekend Deposit Bonus: Get 5% on all weekend deposits",
            description: "Get a 5% bonus on all weekend deposits. Use bonus code: WEEKEND5",
            createdAt: "2026-08-19"
        },
    ]
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">
                    Active Promotions
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {DATA.map((item) => (
                    <Card key={item.title} className="hover:cursor-pointer hover:bg-muted">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                {item.title}
                            </CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-2">
                            <Badge variant="outline">{item.createdAt}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}
