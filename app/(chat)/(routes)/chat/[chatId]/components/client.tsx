"use client";
import { ChatHeader } from "@/components/chat-header";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
  companion: Companion & {
    message: Message[];
    _count?: {
      message: number;
    };
  };
}
export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.message
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };
    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };
  const chatFormProps = {
    isLoading,
    input,
    handleInputChange,
    onSubmit,
  };
  const chatMessagesProps = {
    isLoading,
    companion,
    messages,
  };
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <ChatMessages {...chatMessagesProps} />
      <ChatForm {...chatFormProps} />
    </div>
  );
};
