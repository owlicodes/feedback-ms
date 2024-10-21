import { PageHeader } from "@/components/page-header";
import { CreateNewButton } from "@/features/admin/staff-members/create-new-button";
import { StaffMembersList } from "@/features/admin/staff-members/staff-members-list";

export default function StaffMembersPage() {
  return (
    <div>
      <PageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Staff Members</h1>
          <CreateNewButton />
        </div>
      </PageHeader>
      <div className="space-y-4">
        <StaffMembersList />
      </div>
    </div>
  );
}
