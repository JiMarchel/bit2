import type { ReactNode } from "react";
import { useParams } from "@tanstack/react-router";
import { cn } from "@/shared/lib/cn";
import { SupportList } from "./support-list";

export function SupportShell({ children }: { children: ReactNode }) {
  // `id` is present only on /support/$id — drives the mobile master-detail toggle.
  const { id } = useParams({ strict: false });
  const hasChat = Boolean(id);

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto grid h-[calc(100dvh-7rem)] max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
        <div className={cn("min-h-0", hasChat && "hidden lg:block")}>
          <SupportList />
        </div>
        <div className={cn("min-h-0", !hasChat && "hidden lg:block")}>
          {children}
        </div>
      </div>
    </div>
  );
}
