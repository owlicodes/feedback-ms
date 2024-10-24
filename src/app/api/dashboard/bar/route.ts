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

    const roadmaps = await prisma.roadmap.findMany({
      include: {
        feedbacks: true,
      },
    });

    const chartData = roadmaps.map((roadmap) => ({
      roadmap: roadmap.name.split(" ").join("").toLowerCase(),
      label: roadmap.name,
      count: roadmap.feedbacks.length,
      fill: `var(--color-${roadmap.name.split(" ").join("").toLowerCase()})`,
    }));

    const chartConfig: {
      [key: string]: {
        label: string;
        color?: string;
      };
    } = {};

    if (chartData) {
      chartData.forEach((data, index) => {
        chartConfig[data.roadmap] = {
          label: data.label,
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
