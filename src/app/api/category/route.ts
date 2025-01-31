import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { CreateCategory } from "@/features/admin/categories/types";
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

    const data = await prisma.category.findMany();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.log("Get category failed: ", error);

    return NextResponse.json(
      { message: "Unable to fetch category, please see server logs." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description } = data as CreateCategory;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({
      message: "Category created successfully",
    });
  } catch (error: unknown) {
    console.log("Create category failed: ", error);

    return NextResponse.json(
      { message: "Unable to create category, please see server logs." },
      { status: 500 }
    );
  }
}
