import { AppDataTable } from "@/components/app-data-table";
import prisma from "@/lib/prisma";

import { columns } from "./table-columns";

export const StaffMembersList = async () => {
  const users = await prisma.user.findMany();

  const buildUsers = () => {
    if (!users) return [];

    return users.map((user) => ({
      _id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  };

  return <AppDataTable columns={columns} data={buildUsers()} />;
};
