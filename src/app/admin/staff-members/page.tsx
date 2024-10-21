import { AppPageHeader } from "@/components/app-page-header";
import { CreateNewButton } from "@/features/admin/staff-members/create-new-button";
import { StaffMembersList } from "@/features/admin/staff-members/staff-members-list";
import prisma from "@/lib/prisma";

export default async function StaffMembersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Staff Members</h1>
          <CreateNewButton />
        </div>
      </AppPageHeader>
      <div className="space-y-4">
        <StaffMembersList users={users} />
      </div>
    </div>
  );
}
