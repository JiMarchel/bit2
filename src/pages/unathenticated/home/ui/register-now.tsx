import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export function CallToAction() {
  return (
    <section className="bg-[#080a10] px-6 py-20 lg:py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-br from-primary/15 via-white/3 to-transparent px-8 py-14 text-center text-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
            Ready to trade BIG?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Open an account in minutes. Fund it, and start trading global markets
            with confidence — no hidden fees.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/sign-up"
              className={cn(buttonVariants({ size: "lg" }), "h-12 gap-1.5 px-6 text-base font-semibold")}
            >
              Get started free
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white",
              )}
            >
              I have an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
