import prismaDB from "@/lib/prismaDB";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ChatClient } from "./components/client";
import { redirect } from "next/navigation";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = await auth(); // ✅ await auth()
  if (!userId) return <RedirectToSignIn />;

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      message: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
    },
  });
  if (!companion) {
    return redirect("/");
  }

  return (
    <div>
      <ChatClient companion={companion} />
    </div>
  );
};

export default ChatIdPage;
