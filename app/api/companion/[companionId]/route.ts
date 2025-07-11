import prismaDB from "@/lib/prismaDB";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, description, name, categoryId, instructions, seed } = body;

    if (!params.companionId) {
      return new NextResponse("Companion Id is required", { status: 400 });
    }

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

    const companion = await prismaDB.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
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
    console.log("[COMPANION_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const { userId } = await auth();

    if (!params.companionId) {
      return new NextResponse("Companion Id is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prismaDB.companion.delete({
      where: {
        userId,
        id: params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
