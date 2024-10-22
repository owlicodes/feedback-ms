import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { UpdateRoadmap } from "@/features/admin/roadmaps/types";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const data = await request.json();
    const { name, description } = data as UpdateRoadmap;

    const session = await auth.api.getSession({
      headers: headers(),
    });

    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "User not authorized to perform this action" },
        { status: 401 }
      );
    }

    await prisma.roadmap.update({
      data: {
        name,
        description,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Roadmap updated successfully",
    });
  } catch (error: unknown) {
    console.log("Update roadmap failed: ", error);

    return NextResponse.json(
      { message: "Unable to update roadmap, please see server logs." },
      { status: 500 }
    );
  }
}

// export async function DELETE(request: Request, { params }: Params) {
//   try {
//     const { id } = params;

//     const session = await auth.api.getSession({
//       headers: headers(),
//     });

//     if (session?.user.role !== "admin") {
//       return NextResponse.json(
//         { message: "User not authorized to perform this action" },
//         { status: 401 }
//       );
//     }

//     await prisma.category.delete({
//       where: {
//         id,
//       },
//     });

//     return NextResponse.json({
//       message: "Category deleted successfully",
//     });
//   } catch (error: unknown) {
//     console.log("Delete category failed: ", error);

//     return NextResponse.json(
//       { message: "Unable to delete category, please see server logs." },
//       { status: 500 }
//     );
//   }
// }
