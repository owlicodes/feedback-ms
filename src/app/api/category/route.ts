import { NextResponse } from "next/server";

import { CreateCategory } from "@/features/admin/categories/types";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description } = data as CreateCategory;

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
