import { Badge, Button } from "@/shared/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

export function LatestNews() {
    const DATA = [
        {
            title: "Aussie dollar set for strong week as hot inflation boosts RBA hike bets",
            sources: "Investing.com",
            createdAt: "2026-08-19"
        },
        {
            title: "Dollar steadies as focus turns to U.S. jobless claims",
            sources: "Reuters",
            createdAt: "2026-08-19"
        },
        {
            title: "Eurozone inflation dips to 5.1%, easing pressure on ECB",
            sources: "CNBC",
            createdAt: "2026-08-19"
        },
        {
            title: "Eurozone inflation dips to 5.1%, easing pressure on ECB",
            sources: "CNBC",
            createdAt: "2026-08-19"
        },
    ]
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">
                    Latest News
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {DATA.map((item) => (
                    <Card key={item.title} className="hover:cursor-pointer hover:bg-muted">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-2">
                            <Badge variant="outline">{item.sources}</Badge>
                            <Badge variant="outline">{item.createdAt}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button className="cursor-pointer" variant="link">View All</Button>
            </CardFooter>
        </Card>
    );
}
