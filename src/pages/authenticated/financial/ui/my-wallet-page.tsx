import { Badge, type ColumnDef, DataTable } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";
import { BalanceCard } from "@/features/account-balance";

type TxType = "Deposit" | "Withdrawal" | "Internal Transfer" | "Fee";
type TxStatus = "Success" | "Pending" | "Failed";

type WalletTransaction = {
  id: string;
  date: string;
  wallet: string;
  type: TxType;
  note: string;
  amount: number;
  status: TxStatus;
};

const typeBadge: Record<TxType, string> = {
  Deposit: "bg-emerald-50 text-emerald-600",
  Withdrawal: "bg-rose-50 text-rose-500",
  "Internal Transfer": "bg-sky-50 text-sky-600",
  Fee: "bg-amber-50 text-amber-600",
};

const statusBadge: Record<TxStatus, string> = {
  Success: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Failed: "bg-rose-50 text-rose-500",
};

const TYPES: TxType[] = ["Deposit", "Withdrawal", "Internal Transfer", "Fee"];
const STATUSES: TxStatus[] = ["Success", "Success", "Success", "Pending", "Failed"];
const WALLETS = ["USD @10009", "USD @10010", "IDR @10014", "USD @10012"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const transactions: WalletTransaction[] = Array.from({ length: 23 }, (_, i) => {
  const type = TYPES[i % TYPES.length];
  const day = 27 - (i % 27);
  const base = 25 + i * 7;
  const amount =
    type === "Deposit" ? base : type === "Internal Transfer" ? (i % 2 ? base : -base) : -base;
  const note: Record<TxType, string> = {
    Deposit: `Deposit via Bank Transfer #${10000 + i}`,
    Withdrawal: `Withdrawal to Bank #${20000 + i}`,
    "Internal Transfer": `Transfer to ${WALLETS[(i + 1) % WALLETS.length]}`,
    Fee: `Copytrade fee for cycle ${i + 1}`,
  };
  return {
    id: String(i + 1),
    date: `2026-08-${pad(day)} ${pad(9 + (i % 12))}:${pad((i * 13) % 60)}`,
    wallet: WALLETS[i % WALLETS.length],
    type,
    note: note[type],
    amount,
    status: STATUSES[i % STATUSES.length],
  };
});

const columns: ColumnDef<WalletTransaction>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "wallet", header: "Wallet", enableSorting: false },
  {
    accessorKey: "type",
    header: "Type",
    enableSorting: false,
    cell: ({ row }) => (
      <Badge className={typeBadge[row.original.type]}>{row.original.type}</Badge>
    ),
  },
  {
    accessorKey: "note",
    header: "Note",
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="max-w-[260px] truncate">{getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const n = getValue<number>();
      return (
        <div
          className={cn(
            "text-right font-medium",
            n < 0 ? "text-rose-500" : "text-emerald-600",
          )}
        >
          {`${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US")}`}
        </div>
      );
    },
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

export function MyWalletPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <BalanceCard />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Wallet Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={transactions} pageSize={8} />
        </CardContent>
      </Card>
    </div>
  );
}
