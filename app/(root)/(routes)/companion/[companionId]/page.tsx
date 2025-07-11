import prismaDB from "@/lib/prismaDB";
import CompanionForm from "./components/companion-form";
import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}
const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    return <RedirectToSignIn />;
  }

  // TODO: Check Subscription

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismaDB.category.findMany();

  return (
    <>
      <CompanionForm initialData={companion} categories={categories} />
    </>
  );
};

export default CompanionIdPage;
