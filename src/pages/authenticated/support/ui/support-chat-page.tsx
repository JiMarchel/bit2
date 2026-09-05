import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, Paperclip, Send } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Bubble,
  BubbleContent,
  Button,
  Input,
  Marker,
  MarkerContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/shared/ui";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "@/shared/ui";
import {
  type ChatMessage,
  CONVERSATIONS,
} from "../model/support-data";

function AttachmentView({
  attachment,
}: {
  attachment: NonNullable<ChatMessage["attachments"]>[number];
}) {
  if (attachment.kind === "image") {
    return (
      <Attachment state="done" className="w-56">
        <AttachmentMedia variant="image">
          <img src={attachment.src} alt={attachment.name} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{attachment.name}</AttachmentTitle>
          <AttachmentDescription>{attachment.meta}</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    );
  }
  return (
    <Attachment state="done" className="w-64">
      <AttachmentMedia variant="icon">
        <FileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{attachment.name}</AttachmentTitle>
        <AttachmentDescription>{attachment.meta}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download">
          <Download />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}

export function SupportChatPage({ id }: { id: string }) {
  const conversation = CONVERSATIONS.find((c) => c.id === id);
  const [messages, setMessages] = useState<ChatMessage[]>(
    conversation?.messages ?? [],
  );
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!conversation) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-card-foreground">Conversation not found</h1>
        <Link to="/support" className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
          <ArrowLeft />
          Back to support
        </Link>
      </div>
    );
  }

  function now() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function sendText() {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "user", text: value, time: now() },
    ]);
    setText("");
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "user",
        time: now(),
        attachments: [
          {
            id: crypto.randomUUID(),
            kind: isImage ? "image" : "file",
            name: file.name,
            meta: `${isImage ? "Image" : "File"} · ${(file.size / 1024).toFixed(0)} KB`,
            src: isImage ? URL.createObjectURL(file) : undefined,
          },
        ],
      },
    ]);
    event.target.value = "";
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3 border-b">
          <Link
            to="/support"
            className="text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Back to support"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <Avatar>
            <AvatarFallback>{conversation.agentInitials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base">{conversation.subject}</CardTitle>
            <p className="truncate text-xs text-muted-foreground">{conversation.agentName}</p>
          </div>
          <Badge
            className={cn(
              "capitalize",
              conversation.status === "open"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-muted text-muted-foreground",
            )}
          >
            {conversation.status}
          </Badge>
        </CardHeader>

        <div className="min-h-0 flex-1">
          <MessageScrollerProvider autoScroll>
            <MessageScroller className="h-full">
              <MessageScrollerViewport>
                <MessageScrollerContent className="flex flex-col gap-4 p-4">
                  <Marker variant="separator">
                    <MarkerContent>Today</MarkerContent>
                  </Marker>
                  {messages.map((message) => {
                    const isUser = message.sender === "user";
                    return (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={isUser}
                      >
                        <Message align={isUser ? "end" : "start"}>
                          {!isUser && (
                            <MessageAvatar>
                              <Avatar>
                                <AvatarFallback>{conversation.agentInitials}</AvatarFallback>
                              </Avatar>
                            </MessageAvatar>
                          )}
                          <MessageContent>
                            {message.text && (
                              <Bubble variant={isUser ? "default" : "muted"} align={isUser ? "end" : "start"}>
                                <BubbleContent>{message.text}</BubbleContent>
                              </Bubble>
                            )}
                            {message.attachments && (
                              <AttachmentGroup>
                                {message.attachments.map((attachment) => (
                                  <AttachmentView key={attachment.id} attachment={attachment} />
                                ))}
                              </AttachmentGroup>
                            )}
                            <MessageFooter>{message.time}</MessageFooter>
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    );
                  })}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>

        <div className="flex items-center gap-2 border-t p-3">
          <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Attach file"
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip className="size-5" />
          </Button>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendText();
              }
            }}
            placeholder="Type a message…"
            className="flex-1"
          />
          <Button type="button" size="icon" aria-label="Send" onClick={sendText} disabled={!text.trim()}>
            <Send className="size-5" />
          </Button>
        </div>
      </Card>
  );
}
