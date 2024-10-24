import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
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

    const boards = await prisma.board.findMany({
      include: {
        feedbacks: true,
      },
    });

    const chartData = boards.map((board) => ({
      board: board.name,
      feedbacks: board.feedbacks.length,
      fill: `var(--color-${board.name.split(" ").join("").toLowerCase()})`,
    }));

    const chartConfig: {
      [key: string]: {
        label: string;
        color?: string;
      };
    } = {};

    if (chartData) {
      chartData.forEach((data, index) => {
        chartConfig[data.board.split(" ").join("").toLowerCase()] = {
          label: data.board,
          color: `hsl(var(--chart-${index + 1}))`,
        };
      });
    }

    return NextResponse.json({
      chartData,
      chartConfig,
    });
  } catch (error) {
    console.log("Fetch chart data failed: ", error);

    return NextResponse.json(
      { message: "Unable to fetch chart data, please see server logs." },
      { status: 500 }
    );
  }
}
