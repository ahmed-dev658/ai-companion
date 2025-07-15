"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatFormProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ChatForm = ({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFormProps) => {
  return (
    <form
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
      onSubmit={onSubmit}
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant={"ghost"}>
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};
