"use client";
import { Companion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";
import { ComponentRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  isLoading: boolean;
  companion: Companion;
  messages: ChatMessageProps[];
}

export const ChatMessages = ({
  isLoading,
  companion,
  messages = [],
}: ChatMessagesProps) => {
  const scrollRef = useRef<ComponentRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(messages.length === 0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [messages.length]);

  return (
    <div className="flex-2 overflow-y-auto pr-4">
      <ChatMessage
        role="system"
        isLoading={fakeLoading}
        content={`Hello, I am ${companion.name}, ${companion.description}`}
        src={companion.src}
      />
      {messages.map((message, index) => (
        <ChatMessage
          key={`${message.role}-${index}`}
          role={message.role}
          content={message.content}
          isLoading={message.isLoading}
          src={companion.src} // consistent avatar
        />
      ))}
      {isLoading && (
        <ChatMessage
          role="system"
          isLoading
          // content={`Hello, I am ${companion.name}, ${companion.description}`}
          src={companion.src}
        />
      )}
      <div ref={scrollRef} />
    </div>
  );
};
