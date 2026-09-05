import { Link } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, Badge } from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";
import { CONVERSATIONS, lastMessagePreview } from "../model/support-data";

export function SupportList() {
  return (
    <Card className="flex h-full flex-col overflow-hidden shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
          <MessageSquare className="size-5" />
          Support
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
        <ul className="divide-y divide-border">
          {CONVERSATIONS.map((conversation) => (
            <li key={conversation.id}>
              <Link
                to="/support/$id"
                params={{ id: conversation.id }}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/40"
                activeProps={{ className: "bg-muted/60" }}
              >
                <Avatar>
                  <AvatarFallback>{conversation.agentInitials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-card-foreground">
                      {conversation.subject}
                    </p>
                    <Badge
                      className={cn(
                        "shrink-0 capitalize",
                        conversation.status === "open"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {conversation.status}
                    </Badge>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {conversation.agentName} · {lastMessagePreview(conversation)}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {conversation.updatedAt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
