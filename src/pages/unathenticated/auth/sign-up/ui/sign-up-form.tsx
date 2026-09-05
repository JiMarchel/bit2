import { Link } from "@tanstack/react-router";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { CandlestickChart } from "lucide-react";

const inputClass =
  "h-12 rounded-lg border-white/15 bg-white/5 text-white placeholder:text-white/35 focus-visible:border-primary focus-visible:ring-primary/30";

export function SignUpForm() {
  return (
    <div className="w-full max-w-md">
      <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <CandlestickChart className="size-5" />
        </span>
        <span className="text-xl font-black tracking-tight text-white">
          BIG<span className="text-primary">.</span>
        </span>
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create account</h1>
      <p className="mt-2 text-sm text-white/50">
        Join BIG and start trading in minutes.
      </p>

      <form className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullname" className="text-sm font-medium text-white/80">
            Full name
          </Label>
          <Input id="fullname" placeholder="John Doe" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-white/80">
            Email address
          </Label>
          <Input id="email" type="email" placeholder="you@example.com" className={inputClass} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-white/80">
              Password
            </Label>
            <Input id="password" type="password" placeholder="••••••••" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm" className="text-sm font-medium text-white/80">
              Confirm password
            </Label>
            <Input id="confirm" type="password" placeholder="••••••••" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="country" className="text-sm font-medium text-white/80">
              Country
            </Label>
            <Input id="country" placeholder="Select country" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="referral" className="text-sm font-medium text-white/80">
              Referral code
            </Label>
            <Input id="referral" placeholder="Optional" className={inputClass} />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            className="mt-0.5 size-4 rounded border-white/20 bg-white/5 accent-primary"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
            <a href="#" className="text-primary hover:underline">Risk Disclosure</a>.
          </span>
        </label>

        <Button type="submit" className="mt-1 h-12 w-full text-base font-semibold">
          Create account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
