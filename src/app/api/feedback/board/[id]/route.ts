import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

interface Params {
  params: {
    boardId: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { boardId } = params;

    const feedbacks = await prisma.feedback.findMany({
      where: {
        boardId,
        status: "APPROVED",
      },
      include: {
        user: true,
        roadmap: true,
        comments: {
          where: {
            approved: true,
          },
          include: {
            user: true,
          },
        },
        upvotes: true,
      },
    });

    return NextResponse.json(feedbacks);
  } catch (error: unknown) {
    console.log("Get feedbacks failed: ", error);

    return NextResponse.json(
      { message: "Unable to fetch feedbacks, please see server logs." },
      { status: 500 }
    );
  }
}
