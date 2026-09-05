import { MessagesSquare } from "lucide-react";
import { Card } from "@/shared/ui/card";

export function SupportEmpty() {
  return (
    <Card className="hidden h-full place-items-center shadow-sm lg:grid">
      <div className="text-center text-muted-foreground">
        <MessagesSquare className="mx-auto size-10 opacity-40" />
        <p className="mt-3 text-sm">Select a conversation to start chatting.</p>
      </div>
    </Card>
  );
}
