import prismaDB from "@/lib/prismaDB";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = await auth(); // ✅ await auth()
  if (!userId) return <RedirectToSignIn redirectUrl="/" />;

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

  return <div>Hello Chat Id Page</div>;
};

export default ChatIdPage;
