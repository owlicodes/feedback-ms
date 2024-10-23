import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { CreateRoadmap } from "@/features/admin/roadmaps/types";
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

    const data = await prisma.roadmap.findMany();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.log("Get roadmaps failed: ", error);

    return NextResponse.json(
      { message: "Unable to fetch roadmaps, please see server logs." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description } = data as CreateRoadmap;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.roadmap.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({
      message: "Roadmap created successfully",
    });
  } catch (error: unknown) {
    console.log("Create roadmap failed: ", error);

    return NextResponse.json(
      { message: "Unable to create roadmap, please see server logs." },
      { status: 500 }
    );
  }
}
