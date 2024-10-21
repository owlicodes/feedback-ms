import { User } from "@prisma/client";

import { AppDataTable } from "@/components/app-data-table";

import { columns } from "./table-columns";

export const StaffMembersList = ({ users }: { users: User[] }) => {
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
