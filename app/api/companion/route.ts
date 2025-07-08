import prismaDB from "@/lib/prismaDB";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, description, name, categoryId, instructions, seed } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !description ||
      !name ||
      !categoryId ||
      !instructions ||
      !seed
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const companion = await prismaDB.companion.create({
      data: {
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        seed,
        categoryId,
        description,
        instructions,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
