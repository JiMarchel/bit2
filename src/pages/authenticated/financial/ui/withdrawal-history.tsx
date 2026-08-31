import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Badge,
  type ColumnDef,
  DataTable,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Status = "Success" | "Pending" | "Rejected";

type Withdrawal = {
  id: string;
  datetime: string;
  code: string;
  method: string;
  amount: number;
  status: Status;
};

const statusBadge: Record<Status, string> = {
  Success: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Rejected: "bg-rose-50 text-rose-500",
};

const METHODS = ["Bank Transfer — BCA", "Bank Transfer — Mandiri", "Bank Transfer — BNI"];
const STATUSES: Status[] = ["Success", "Pending", "Rejected"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const withdrawals: Withdrawal[] = Array.from({ length: 24 }, (_, i) => {
  const day = 28 - (i % 28);
  return {
    id: String(i + 1),
    datetime: `2026-08-${pad(day)} ${pad(8 + (i % 12))}:${pad((i * 19) % 60)}`,
    code: `WD-${String(500218 - i).padStart(6, "0")}`,
    method: METHODS[i % METHODS.length],
    amount: 75 + i * 20,
    status: STATUSES[i % STATUSES.length],
  };
});

const columns: ColumnDef<Withdrawal>[] = [
  { accessorKey: "datetime", header: "Datetime" },
  { accessorKey: "code", header: "Code", enableSorting: false },
  { accessorKey: "method", header: "Payment Method", enableSorting: false },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => (
      <div className="text-right font-medium">
        {`$${getValue<number>().toLocaleString("en-US")}`}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge className={statusBadge[row.original.status]}>{row.original.status}</Badge>
    ),
  },
];

export function WithdrawalHistory() {
  const [status, setStatus] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return withdrawals.filter((w) => {
      if (status !== "all" && w.status !== status) return false;
      const date = w.datetime.slice(0, 10);
      if (from && date < from) return false;
      if (to && date > to) return false;
      if (query && !`${w.code} ${w.method}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [status, search, from, to]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Withdrawal History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code or method"
              className="pl-8"
            />
          </div>
          <Select value={status} onValueChange={(value) => setStatus(value as Status | "all")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            aria-label="From date"
          />
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            aria-label="To date"
          />
        </div>
        <DataTable columns={columns} data={rows} pageSize={8} />
      </CardContent>
    </Card>
  );
}
