"use client";
import { Companion } from "@prisma/client";
import { ChatMessage } from "@/components/chat-message";

interface Message {
  id: string;
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}
interface ChatMessagesProps {
  isLoading: boolean;
  companion: Companion;
  messages: Message[];
}
interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}
export const ChatMessages = ({
  isLoading,
  companion,
  messages = [],
}: ChatMessagesProps) => {
  console.log("🚀 ~ messages:", messages);
  const chatMessageProps: ChatMessageProps = {
    role: "system",
    isLoading,
    content: `Hello, I am ${companion.name}, ${companion.description}`,
    src: companion.src,
  };

  return (
    <div className="flex-2 overflow-y-auto pr-4">
      <ChatMessage {...chatMessageProps} />
      <ChatMessage {...chatMessageProps} role="user" />
    </div>
  );
};
