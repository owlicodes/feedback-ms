import { AppPageHeader } from "@/components/app-page-header";
import { CreateNewRoadmap } from "@/features/admin/roadmaps/create-new-roadmap";

export default function RoadmapsPage() {
  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Roadmaps</h1>
          <CreateNewRoadmap />
        </div>
      </AppPageHeader>
      {/* <div>
        <StaffMembersList users={users} />
      </div> */}
    </div>
  );
}
