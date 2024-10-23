import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { CreateComment } from "@/features/public/feedbacks/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    feedbackId: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { feedbackId } = params;
    const data = await request.json();
    const { comment, userId } = data as CreateComment;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.comment.create({
      data: {
        comment,
        feedbackId,
        userId,
      },
    });

    return NextResponse.json({
      message:
        "Comment created successfully. Our team will review your comment before making it public. Thank you.",
    });
  } catch (error: unknown) {
    console.log("Create comment failed: ", error);

    return NextResponse.json(
      { message: "Unable to create comment, please see server logs." },
      { status: 500 }
    );
  }
}
