import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Comment deleted successfully",
    });
  } catch (error: unknown) {
    console.log("Delete comment failed: ", error);

    return NextResponse.json(
      { message: "Unable to delete comment, please see server logs." },
      { status: 500 }
    );
  }
}
