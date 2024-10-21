import { PageHeader } from "@/components/page-header";
import { CreateNewButton } from "@/features/admin/staff-members/create-new-button";
import { StaffMembersList } from "@/features/admin/staff-members/staff-members-list";

export default function StaffMembersPage() {
  return (
    <div>
      <PageHeader>Staff Members</PageHeader>
      <div className="space-y-4">
        <CreateNewButton />
        <StaffMembersList />
      </div>
    </div>
  );
}
