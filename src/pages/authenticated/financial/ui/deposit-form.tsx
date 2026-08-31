import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Banknote, Check, CreditCard } from "lucide-react";
import { Button } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useAppForm } from "@/shared/ui/form";
import { toast } from "@/shared/ui/toast";
import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { cn } from "@/shared/lib/cn";

type Channel = "manual" | "virtual";

const CHANNELS = [
  {
    value: "manual" as const,
    title: "Manual Transfer",
    description: "Transfer via bank or QRIS, then upload your proof of payment.",
    icon: Banknote,
  },
  {
    value: "virtual" as const,
    title: "Virtual Account",
    description: "Get a unique virtual account number with instant confirmation.",
    icon: CreditCard,
  },
];

const methodOptions = [
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "QRIS", value: "qris" },
];
const walletOptions = USERS_ACCOUNTS.map((account) => ({
  label: `${account.login} — ${account.accountType}`,
  value: account.login,
}));
const bankOptions = [
  { label: "BCA — 1234567890 (PT AGL Market)", value: "bca" },
  { label: "Mandiri — 0987654321 (PT AGL Market)", value: "mandiri" },
  { label: "BNI — 1122334455 (PT AGL Market)", value: "bni" },
];
const vaOptions = [
  { label: "BCA Virtual Account", value: "bca_va" },
  { label: "BNI Virtual Account", value: "bni_va" },
  { label: "Mandiri Virtual Account", value: "mandiri_va" },
  { label: "Permata Virtual Account", value: "permata_va" },
];

const required = z.string().min(1, "This field is required");

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2].map((n, i) => (
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
          {i === 0 && (
            <div
              className={cn(
                "h-0.5 w-8 rounded-full transition-colors duration-300",
                step > 1 ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function DepositForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [channel, setChannel] = useState<Channel | null>(null);

  function goToStep(next: number) {
    setDir(next > step ? "forward" : "back");
    setStep(next);
  }

  const form = useAppForm({
    defaultValues: {
      method: "",
      walletDestination: "",
      bankDestination: "",
      bankUser: "",
      vaBank: "",
      amount: "",
      proof: null as File | null,
    },
    onSubmit: () => {
      toast.add({
        title: "Deposit submitted",
        description:
          channel === "manual"
            ? "Manual transfer request created. Awaiting confirmation."
            : "Virtual account created. Complete the payment to confirm.",
      });
      form.reset();
      setChannel(null);
      goToStep(1);
    },
  });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Deposit</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          key={step}
          className={cn(
            "animate-in fade-in-0 duration-300",
            dir === "forward" ? "slide-in-from-right-6" : "slide-in-from-left-6",
          )}
        >
          {step === 1 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Choose a payment channel
                </p>
                <StepIndicator step={step} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
              {CHANNELS.map((item) => {
                const active = channel === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setChannel(item.value)}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                      active
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border hover:bg-muted/40",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl",
                        active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <item.icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-card-foreground">{item.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {active && <Check className="ml-auto size-5 shrink-0 text-primary" />}
                  </button>
                );
              })}
            </div>
              <div className="flex justify-end">
                <Button size="lg" disabled={!channel} onClick={() => goToStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => goToStep(1)}>
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <p className="text-sm text-muted-foreground">
                  {channel === "manual" ? "Manual Transfer" : "Virtual Account"} details
                </p>
              </div>
              <StepIndicator step={step} />
            </div>

            {channel === "manual" ? (
              <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                <form.AppField name="method" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Select
                      label="Method"
                      placeholder="Select method"
                      searchable={false}
                      clearable={false}
                      data={methodOptions}
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="walletDestination" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Select
                      label="Wallet Destination"
                      placeholder="Select wallet"
                      searchable={false}
                      clearable={false}
                      data={walletOptions}
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="bankDestination" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Select
                      label="Bank Destination"
                      placeholder="Select destination bank"
                      searchable={false}
                      clearable={false}
                      data={bankOptions}
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="bankUser" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Input
                      label="Your Bank Account"
                      placeholder="e.g. BCA 555xxxx — John Doe"
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="amount" validators={{ onChange: required }}>
                  {(field) => (
                    <field.CurrencyInput
                      label="Amount"
                      currency="USD"
                      placeholder="0.00"
                      required
                    />
                  )}
                </form.AppField>
                <div className="md:col-span-2">
                  <form.AppField
                    name="proof"
                    validators={{
                      onChange: ({ value }) =>
                        value ? undefined : "Proof of payment is required",
                    }}
                  >
                    {(field) => <field.DropZone label="Proof of Payment" required />}
                  </form.AppField>
                </div>
              </div>
            ) : (
              <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                <form.AppField name="vaBank" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Select
                      label="Virtual Account Bank"
                      placeholder="Select bank"
                      searchable={false}
                      clearable={false}
                      data={vaOptions}
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="walletDestination" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Select
                      label="Wallet Destination"
                      placeholder="Select wallet"
                      searchable={false}
                      clearable={false}
                      data={walletOptions}
                      required
                    />
                  )}
                </form.AppField>
                <form.AppField name="amount" validators={{ onChange: required }}>
                  {(field) => (
                    <field.CurrencyInput
                      label="Amount"
                      currency="USD"
                      placeholder="0.00"
                      required
                    />
                  )}
                </form.AppField>
              </div>
            )}

            <div className="flex justify-end">
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" size="lg" disabled={!canSubmit || isSubmitting}>
                    Submit Deposit
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        )}
        </div>
      </CardContent>
    </Card>
  );
}
