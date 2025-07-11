"use client";

import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { BotAvatar } from "./bot-avatar";
import { useTheme } from "next-themes";

interface ChatMessageProps {
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
  console.log("🚀 ~ role:", role, isLoading, src);
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }
    navigator.clipboard.writeText(content);
    toast("Copied", {
      description: "Message copied to clipboard",
    });
  };
  console.log("🚀 ~ onCopy ~ onCopy:", onCopy);

  const roleSystem = role !== "user";

  return (
    <div
      className={cn(
        "group flex items-end gap-x-3 py-4 w-full gap-7",
        role === "user" && "justify-end"
      )}
    >
      {roleSystem && src && <BotAvatar src={src} />}

      <div
        className={`relative rounded-md rounded-${
          roleSystem ? "tl" : "tr"
        }-none px-4 py-2 max-w-sm text-sm bg-primary/10 items-stretch gap-5`}
      >
        <div
          className={`absolute top-0 -${
            roleSystem ? "left" : "right"
          }-[10px] w-0 h-0 border-t-[10px]
          border-t-primary/10 border-${roleSystem ? "l" : "r"}-[10px] border-${
            roleSystem ? "l" : "r"
          }-transparent border-${roleSystem ? "r" : "l"}-0
          border-b-0`}
        ></div>
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : (
          content
        )}
      </div>
    </div>
  );
};
