import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { UpdateBoard } from "@/features/admin/boards/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const data = await request.json();
    const { name, description } = data as UpdateBoard;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.board.update({
      data: {
        name,
        description,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Board updated successfully",
    });
  } catch (error: unknown) {
    console.log("Update board failed: ", error);

    return NextResponse.json(
      { message: "Unable to update board, please see server logs." },
      { status: 500 }
    );
  }
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

    await prisma.board.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Board deleted successfully",
    });
  } catch (error: unknown) {
    console.log("Delete board failed: ", error);

    return NextResponse.json(
      { message: "Unable to delete board, please see server logs." },
      { status: 500 }
    );
  }
}
