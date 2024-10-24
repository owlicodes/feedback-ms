import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { TCreateUpvote } from "@/features/public/feedbacks/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { feedbackId, userId } = data as TCreateUpvote;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.upvote.create({
      data: {
        feedbackId,
        userId,
      },
    });

    return NextResponse.json({
      message: "Feedback upvoted successfully",
    });
  } catch (error: unknown) {
    console.log("Upvote feedback failed: ", error);

    return NextResponse.json(
      { message: "Unable to upvote feedback, please see server logs." },
      { status: 500 }
    );
  }
}
