import { Badge, type ColumnDef, DataTable } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const TYPES = [
  "Internal Transfer",
  "Fee Copytrade",
  "Adjustment Wallet",
  "Deposit",
] as const;

type TxType = (typeof TYPES)[number];
type TxStatus = "Success" | "Pending" | "Failed";

type Transaction = {
  id: string;
  date: string;
  wallet: string;
  type: TxType;
  description: string;
  amount: number;
  status: TxStatus;
};

const typeBadge: Record<TxType, string> = {
  "Internal Transfer": "bg-teal-600 text-white hover:bg-teal-600",
  "Fee Copytrade": "bg-orange-500 text-white hover:bg-orange-500",
  "Adjustment Wallet": "bg-blue-600 text-white hover:bg-blue-600",
  Deposit: "bg-emerald-600 text-white hover:bg-emerald-600",
};

const statusBadge: Record<TxStatus, string> = {
  Success: "bg-emerald-600 text-white hover:bg-emerald-600",
  Pending: "bg-amber-500 text-white hover:bg-amber-500",
  Failed: "bg-red-500 text-white hover:bg-red-500",
};

function formatDate(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}


const BASE = Date.UTC(2026, 6, 6, 9, 53, 2); // 2026-07-06 09:53:02 UTC

const transactions: Transaction[] = Array.from({ length: 35 }, (_, i) => {
  const type = TYPES[i % TYPES.length];
  const date = formatDate(new Date(BASE - i * 3.4 * 3_600_000));

  const byType: Record<TxType, { wallet: string; description: string; amount: number }> = {
    "Internal Transfer": {
      wallet: "Wallet USD @floating",
      description: `Internal Transfer Wallet USD @floating to ${10009 + i}`,
      amount: -(7 + i * 13),
    },
    "Fee Copytrade": {
      wallet: "Wallet USD @floating",
      description: `Copy Master ${1782742610 + i}`,
      amount: 10,
    },
    "Adjustment Wallet": {
      wallet: "Wallet USD @floating",
      description: i % 8 === 2 ? "Adjustment Wallet $-10" : "Adjustment Wallet $3",
      amount: i % 8 === 2 ? -10 : 3,
    },
    Deposit: {
      wallet: "Wallet USD @10000",
      description: "Deposit via Bank Transfer to Wallet USD @10000",
      amount: 10,
    },
  };

  return { id: String(i + 1), date, type, status: "Success", ...byType[type] };
});

const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="max-w-70 truncate">{getValue<string>()}</div>
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
            n < 0 ? "text-red-500" : "text-foreground",
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
      <Badge className={statusBadge[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
];

export function TransactionsPage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h1 className="mb-4 text-lg font-semibold text-card-foreground">
        Transactions
      </h1>
      <DataTable columns={columns} data={transactions} pageSize={10} />
    </div>
  );
}
