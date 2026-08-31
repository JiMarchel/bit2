import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Banknote, Check, Landmark } from "lucide-react";
import { Button } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useAppForm } from "@/shared/ui/form";
import { toast } from "@/shared/ui/toast";
import { USERS_ACCOUNTS } from "@/shared/lib/temp-data";
import { cn } from "@/shared/lib/cn";

const TOTAL_STEPS = 3;

const channelOptions = [
  {
    value: "direct_bank",
    title: "Direct Bank Transfer",
    description: "Withdraw directly to your registered bank account.",
    icon: Banknote,
  },
];

const routeOptions = [
  {
    value: "bank_transfer",
    title: "Bank Transfer",
    description: "Standard bank transfer, processed within 1 business day.",
    icon: Landmark,
  },
];

const walletOptions = USERS_ACCOUNTS.map((account) => ({
  label: `${account.login} — ${account.accountType}`,
  value: account.login,
}));

const bankOptions = [
  { label: "BCA — 5551234567 (John Doe)", value: "bca" },
  { label: "Mandiri — 5559876543 (John Doe)", value: "mandiri" },
  { label: "BNI — 5551112223 (John Doe)", value: "bni" },
];

const required = z.string().min(1, "This field is required");
const otpSchema = z.string().length(6, "Enter the 6-digit OTP");

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

type Option = {
  value: string;
  title: string;
  description: string;
  icon: typeof Banknote;
};

function SelectableCards({
  options,
  value,
  onSelect,
}: {
  options: Option[];
  value: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
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
              <option.icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-card-foreground">{option.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{option.description}</p>
            </div>
            {active && <Check className="ml-auto size-5 shrink-0 text-primary" />}
          </button>
        );
      })}
    </div>
  );
}

export function WithdrawalForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [channel, setChannel] = useState<string | null>(null);
  const [route, setRoute] = useState<string | null>(null);

  function goToStep(next: number) {
    setDir(next > step ? "forward" : "back");
    setStep(next);
  }

  const form = useAppForm({
    defaultValues: {
      walletSource: "",
      bankDestination: "",
      amount: "",
      otp: "",
    },
    onSubmit: () => {
      toast.add({
        title: "Withdrawal requested",
        description: "Your withdrawal request has been submitted for review.",
      });
      form.reset();
      setChannel(null);
      setRoute(null);
      goToStep(1);
    },
  });

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Withdrawal</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          key={step}
          className={cn(
            "animate-in fade-in-0 duration-300",
            dir === "forward" ? "slide-in-from-right-6" : "slide-in-from-left-6",
          )}
        >
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Choose a payment channel</p>
                <StepIndicator step={step} />
              </div>
              <SelectableCards options={channelOptions} value={channel} onSelect={setChannel} />
              <div className="flex justify-end">
                <Button size="lg" disabled={!channel} onClick={() => goToStep(2)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => goToStep(1)}>
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <p className="text-sm text-muted-foreground">Choose a route</p>
                </div>
                <StepIndicator step={step} />
              </div>
              <SelectableCards options={routeOptions} value={route} onSelect={setRoute} />
              <div className="flex justify-end">
                <Button size="lg" disabled={!route} onClick={() => goToStep(3)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
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
                  <Button type="button" variant="ghost" size="sm" onClick={() => goToStep(2)}>
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <p className="text-sm text-muted-foreground">Withdrawal details</p>
                </div>
                <StepIndicator step={step} />
              </div>

              <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                <form.AppField name="walletSource" validators={{ onChange: required }}>
                  {(field) => (
                    <field.Select
                      label="Wallet Source"
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
                  <form.AppField name="otp" validators={{ onChange: otpSchema }}>
                    {(field) => (
                      <field.Otp
                        label="OTP Code"
                        description="Enter the 6-digit code sent to your registered email."
                      />
                    )}
                  </form.AppField>
                </div>
              </div>

              <div className="flex justify-end">
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <Button type="submit" size="lg" disabled={!canSubmit || isSubmitting}>
                      Submit Withdrawal
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
