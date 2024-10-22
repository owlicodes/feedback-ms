import { AppPageHeader } from "@/components/app-page-header";
import { User } from "@/features/admin/users/types";
import { UsersList } from "@/features/admin/users/users-list";
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    where: {
      role: {
        not: "admin",
      },
    },
  });

  const buildUsers = (): User[] => {
    if (!users) return [];

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  };

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Users</h1>
        </div>
      </AppPageHeader>
      <div>
        <UsersList users={buildUsers()} />
      </div>
    </div>
  );
}
