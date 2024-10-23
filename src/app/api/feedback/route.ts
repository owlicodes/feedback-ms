import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { CreateFeedback } from "@/features/public/feedbacks/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId, boardId, feedback } = data as CreateFeedback;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.feedback.create({
      data: {
        userId,
        boardId,
        feedback,
      },
    });

    return NextResponse.json({
      message:
        "Feedback created successfully. Our team will review your feedback and we will let you know once we have an action. Thank you!",
    });
  } catch (error: unknown) {
    console.log("Create feedback failed: ", error);

    return NextResponse.json(
      { message: "Unable to create feedback, please see server logs." },
      { status: 500 }
    );
  }
}
