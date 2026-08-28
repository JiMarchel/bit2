import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { Button } from "@/shared/ui";

export function BalanceCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-green-900 via-green-800 to-green-600 p-6 text-white shadow-sm md:p-8">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
          USD · Floating
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
          USD · Rate 10000
        </span>
      </div>

      <p className="mt-5 text-sm text-white/70">Total Balance</p>
      <p className="mt-1 text-4xl font-bold tracking-tight">$ 60</p>

      <div className="mt-6 flex flex-wrap gap-x-24 gap-y-4">
        <div>
          <p className="text-sm text-white/70">Available balance</p>
          <p className="mt-1 font-semibold">$ 60</p>
        </div>
        <div>
          <p className="text-sm text-white/70">Pending balance</p>
          <p className="mt-1 font-semibold">$ 0</p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Button className="bg-emerald-500 text-white hover:bg-emerald-500/90">
          <ArrowDown className="size-4" />
          Deposit
        </Button>
        <Button className="bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">
          <ArrowUp className="size-4" />
          Withdraw
        </Button>
      </div>

      <div className="absolute top-6 right-6 flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 md:top-8 md:right-8">
        <Wallet className="size-5" />
      </div>
    </div>
  );
}
