"use client";

import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { BotAvatar } from "@/components/bot-avatar";
import { useTheme } from "next-themes";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);
  console.log("🚀 ~ role:", role, isLoading, src);
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }
    navigator.clipboard.writeText(content);
    setCopied(true); // Show the check icon
    toast("Copied", {
      description: "Message copied to clipboard",
    });

    // Reset copied icon after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  console.log("🚀 ~ onCopy ~ onCopy:", onCopy);

  const isUser = role === "user";

  return (
    <div
      className={cn(
        "group flex items-end gap-x-3 py-4 w-full gap-7",
        isUser && "justify-end"
      )}
    >
      {!isUser && src && <BotAvatar src={src} />}

      {/* Message Bubble */}
      <div
        className={cn(
          "relative rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10 items-stretch gap-5",
          isUser ? "rounded-tr-none" : "rounded-tl-none"
        )}
      >
        {/* Chat Bubble Tail */}
        <div
          className={cn(
            "absolute top-0 w-0 h-0 border-t-[10px] border-t-primary/10 border-b-0",
            isUser
              ? "-right-[10px] border-r-[10px] border-r-transparent border-l-0"
              : "-left-[10px] border-l-[10px] border-l-transparent border-r-0"
          )}
        ></div>

        {/* Message Content or Loading */}
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : (
          content
        )}
      </div>

      {/* User Avatar */}
      {isUser && <UserAvatar />}

      {!isUser && !isLoading && (
        <Button
          onClick={!copied ? onCopy : undefined}
          disabled={copied}
          className="opacity-0 group-hover:opacity-100 transition"
          size={"icon"}
          variant={"ghost"}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      )}
    </div>
  );
};
