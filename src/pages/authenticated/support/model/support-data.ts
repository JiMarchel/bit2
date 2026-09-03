export type ChatAttachment = {
  id: string;
  kind: "image" | "file";
  name: string;
  meta: string;
  src?: string;
};

export type ChatMessage = {
  id: string;
  sender: "user" | "admin";
  text?: string;
  time: string;
  attachments?: ChatAttachment[];
};

export type Conversation = {
  id: string;
  subject: string;
  agentName: string;
  agentInitials: string;
  status: "open" | "closed";
  updatedAt: string;
  messages: ChatMessage[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    subject: "Withdrawal not received",
    agentName: "Admin Rina",
    agentInitials: "AR",
    status: "open",
    updatedAt: "09:42",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Hi, I made a withdrawal 2 days ago but haven't received it yet.",
        time: "09:30",
      },
      {
        id: "m2",
        sender: "admin",
        text: "Hi! Let me check that for you. Could you share the transfer receipt?",
        time: "09:33",
      },
      {
        id: "m3",
        sender: "user",
        time: "09:35",
        attachments: [
          { id: "a1", kind: "file", name: "withdrawal-receipt.pdf", meta: "PDF · 240 KB" },
        ],
      },
      {
        id: "m4",
        sender: "admin",
        text: "Thanks. It's being processed and will arrive within 24 hours.",
        time: "09:42",
      },
    ],
  },
  {
    id: "2",
    subject: "KYC document verification",
    agentName: "Admin Dio",
    agentInitials: "AD",
    status: "open",
    updatedAt: "Yesterday",
    messages: [
      {
        id: "m1",
        sender: "admin",
        text: "Your KYC is almost done. Please re-upload a clearer photo of your ID.",
        time: "16:10",
      },
      {
        id: "m2",
        sender: "user",
        text: "Here it is.",
        time: "16:20",
        attachments: [
          {
            id: "a1",
            kind: "image",
            name: "id-card.jpg",
            meta: "JPG · 1.2 MB",
            src: "/auth-image.webp",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    subject: "How to enable copy trading",
    agentName: "Admin Sella",
    agentInitials: "AS",
    status: "closed",
    updatedAt: "Aug 27",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "How do I start copy trading?",
        time: "11:00",
      },
      {
        id: "m2",
        sender: "admin",
        text: "Open the Copy Trading page, pick a master, and set your allocation. Done!",
        time: "11:05",
      },
    ],
  },
];
export function lastMessagePreview(conversation: Conversation) {
  const last = conversation.messages[conversation.messages.length - 1];
  if (!last) return "";
  if (last.text) return last.text;
  const attachment = last.attachments?.[0];
  if (attachment) return attachment.kind === "image" ? "📷 Photo" : "📎 Attachment";
  return "";
}
