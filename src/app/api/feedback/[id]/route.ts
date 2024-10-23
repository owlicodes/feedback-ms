import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { Feedback, UpdateFeedback } from "@/features/admin/ideas/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const id = (await params).id;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    const data = await prisma.feedback.findFirst({
      where: {
        id,
      },
      include: {
        board: true,
        category: true,
        roadmap: true,
        user: true,
      },
    });

    if (data) {
      const feedback: Feedback = {
        categoryId: data.categoryId,
        categoryName: data.category?.name,
        createdAt: data.createdAt,
        id: data.id,
        roadmapId: data.roadmapId,
        roadmapName: data.roadmap?.name,
        status: data.status,
        userEmail: data.user.email,
        userId: data.userId,
        userName: data.user.name,
        boardId: data.boardId,
        boardName: data.board.name,
        feedback: data.feedback,
      };

      return NextResponse.json(feedback);
    } else {
      return NextResponse.json({});
    }
  } catch (error: unknown) {
    console.log("Get feedback details failed: ", error);

    return NextResponse.json(
      { message: "Unable to fetch feedback details, please see server logs." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const data = await request.json();
    const { boardId, categoryId, roadmapId, status } = data as UpdateFeedback;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.feedback.update({
      data: {
        ...(boardId !== null && { boardId }),
        ...(categoryId !== null && { categoryId }),
        ...(roadmapId !== null && { roadmapId }),
        status,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Feedback updated successfully",
    });
  } catch (error: unknown) {
    console.log("Update feedback failed: ", error);

    return NextResponse.json(
      { message: "Unable to update feedback, please see server logs." },
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

    await prisma.feedback.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Feedback deleted successfully",
    });
  } catch (error: unknown) {
    console.log("Delete feedback failed: ", error);

    return NextResponse.json(
      { message: "Unable to delete feedback, please see server logs." },
      { status: 500 }
    );
  }
}
