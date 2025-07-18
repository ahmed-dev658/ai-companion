import Categories from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import prismaDB from "@/lib/prismaDB";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

async function RootPage({ searchParams }: RootPageProps) {
  const data = await prismaDB.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          message: true,
        },
      },
    },
  });

  const categories = await prismaDB.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}

export default RootPage;
