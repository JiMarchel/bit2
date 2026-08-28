import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

type Event = {
  time: string;
  country: string;
  flag: string;
  title: string;
  actual?: string;
  forecast?: string;
  previous?: string;
};

const events: Event[] = [
  { time: "13:45", country: "DE", flag: "🇩🇪", title: "G20 Meetings", actual: "6.8%", forecast: "—", previous: "6.1%" },
  { time: "13:45", country: "FR", flag: "🇫🇷", title: "Consumer Spending MM", forecast: "0%", previous: "0.4%" },
  { time: "13:45", country: "FR", flag: "🇫🇷", title: "CPI (EU Norm) Prelim MM", previous: "0.6%" },
  { time: "13:45", country: "FR", flag: "🇫🇷", title: "CPI (EU Norm) Prelim YY", previous: "2.4%" },
  { time: "13:45", country: "FR", flag: "🇫🇷", title: "CPI Prelim MM NSA", previous: "0.2%" },
];

function Stat({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <span className="text-xs text-muted-foreground">
      <span className="font-medium text-foreground/70">{label}:</span> {value}
    </span>
  );
}

export function EconomicCalendar() {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {events.map((event, i) => (
            <li key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold text-white">
                {event.time}
              </span>
              <span className="text-lg leading-none">{event.flag}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-card-foreground">
                  {event.title}
                </p>
                <div className="mt-0.5 flex flex-wrap gap-x-3">
                  <Stat label="A" value={event.actual} />
                  <Stat label="F" value={event.forecast} />
                  <Stat label="P" value={event.previous} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="flex items-center justify-center gap-1 border-t border-border py-3 text-sm font-medium text-primary hover:underline"
        >
          More events
          <ChevronRight className="size-4" />
        </a>
      </CardContent>
    </Card>
  );
}
