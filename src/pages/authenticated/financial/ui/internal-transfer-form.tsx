import { useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  Badge,
  Button,
  Field,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { toast } from "@/shared/ui/toast";
import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { cn } from "@/shared/lib/cn";

const TOTAL_STEPS = 3;

type Account = (typeof USERS_ACCOUNTS)[number];

function money(value: number, currency: "USD" | "IDR") {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(value);
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_STEPS }, (_, idx) => idx + 1).map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={cn(
              "flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
              step < n ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground",
              step === n && "ring-2 ring-primary/30",
            )}
          >
            {step > n ? <Check className="size-3.5" /> : n}
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div
              className={cn(
                "h-0.5 w-8 rounded-full transition-colors duration-300",
                step > n ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function AccountBalanceCard({
  account,
  label,
  current,
  estimated,
  tone,
}: {
  account: Account;
  label: string;
  current: number;
  estimated: number;
  tone: "up" | "down";
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-1 font-semibold text-card-foreground">{account.login}</p>
          <p className="text-xs text-muted-foreground">{account.accountType}</p>
        </div>
        <Badge className="bg-muted text-muted-foreground">{account.currency}</Badge>
      </div>
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current</span>
          <span className="font-medium text-card-foreground">
            {money(current, account.currency)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated</span>
          <span
            className={cn(
              "font-semibold",
              tone === "up" ? "text-emerald-600" : "text-rose-500",
            )}
          >
            {money(estimated, account.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function InternalTransferForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  function goToStep(next: number) {
    setDir(next > step ? "forward" : "back");
    setStep(next);
  }

  const source = USERS_ACCOUNTS.find((a) => a.login === from) ?? null;
  const destination = USERS_ACCOUNTS.find((a) => a.login === to) ?? null;

  const toOptions = useMemo(
    () =>
      USERS_ACCOUNTS.filter(
        (a) => a.login !== from && (!source || a.currency === source.currency),
      ),
    [from, source],
  );

  const amountNum = Number(amount) || 0;
  const amountValid =
    !!source && amountNum > 0 && amountNum <= source.balanceValue;

  function reset() {
    setFrom("");
    setTo("");
    setAmount("");
    goToStep(1);
  }

  function handleConfirm() {
    toast.add({
      title: "Transfer submitted",
      description: `${money(amountNum, source!.currency)} sent from ${from} to ${to}.`,
    });
    reset();
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Internal Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          key={step}
          className={cn(
            "animate-in fade-in-0 duration-300",
            dir === "forward" ? "slide-in-from-right-6" : "slide-in-from-left-6",
          )}
        >
          {/* Step 1 — choose accounts */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Choose accounts</p>
                <StepIndicator step={step} />
              </div>
              <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Transfer From</FieldLabel>
                  <Select
                    value={from}
                    onValueChange={(value) => {
                      setFrom(value as string);
                      setTo("");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {USERS_ACCOUNTS.map((a) => (
                        <SelectItem key={a.login} value={a.login}>
                          {a.login} — {a.accountType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Transfer To</FieldLabel>
                  <Select
                    value={to}
                    disabled={!source}
                    onValueChange={(value) => setTo(value as string)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={source ? "Select destination account" : "Select source first"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {toOptions.map((a) => (
                        <SelectItem key={a.login} value={a.login}>
                          {a.login} — {a.accountType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="flex justify-end">
                <Button size="lg" disabled={!from || !to} onClick={() => goToStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 — amount */}
          {step === 2 && source && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => goToStep(1)}>
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <p className="text-sm text-muted-foreground">Transfer amount</p>
                </div>
                <StepIndicator step={step} />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border p-4 text-sm">
                <span className="text-muted-foreground">
                  Available in {source.login}
                </span>
                <span className="font-semibold text-card-foreground">
                  {money(source.balanceValue, source.currency)}
                </span>
              </div>

              <Field>
                <FieldLabel htmlFor="transfer-amount">
                  Amount ({source.currency}) <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="transfer-amount"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  aria-invalid={amount !== "" && !amountValid}
                />
                {amount !== "" && !amountValid && (
                  <p className="text-sm text-destructive">
                    {amountNum <= 0
                      ? "Enter an amount greater than 0."
                      : "Amount exceeds available balance."}
                  </p>
                )}
              </Field>

              <div className="flex justify-end">
                <Button size="lg" disabled={!amountValid} onClick={() => goToStep(3)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 — confirmation */}
          {step === 3 && source && destination && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => goToStep(2)}>
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <p className="text-sm text-muted-foreground">Confirmation</p>
                </div>
                <StepIndicator step={step} />
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
                <p className="text-sm text-muted-foreground">You are transferring</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">
                  {money(amountNum, source.currency)}
                </p>
                <p className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  {source.login} <ArrowRight className="size-4" /> {destination.login}
                </p>
              </div>

              <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
                <AccountBalanceCard
                  account={source}
                  label="From"
                  current={source.balanceValue}
                  estimated={source.balanceValue - amountNum}
                  tone="down"
                />
                <div className="mx-auto flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary max-md:rotate-90">
                  <ArrowRight className="size-4 max-md:hidden" />
                  <ArrowDown className="size-4 md:hidden" />
                </div>
                <AccountBalanceCard
                  account={destination}
                  label="To"
                  current={destination.balanceValue}
                  estimated={destination.balanceValue + amountNum}
                  tone="up"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button size="lg" onClick={handleConfirm}>
                  Confirm Transfer
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
