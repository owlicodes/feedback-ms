import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { CreateBoard } from "@/features/admin/boards/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    const data = await prisma.board.findMany();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.log("Get boards failed: ", error);

    return NextResponse.json(
      { message: "Unable to fetch boards, please see server logs." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description } = data as CreateBoard;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.board.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({
      message: "Board created successfully",
    });
  } catch (error: unknown) {
    console.log("Create board failed: ", error);

    return NextResponse.json(
      { message: "Unable to create board, please see server logs." },
      { status: 500 }
    );
  }
}
