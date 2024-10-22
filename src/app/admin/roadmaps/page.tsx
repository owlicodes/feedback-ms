import { AppPageHeader } from "@/components/app-page-header";
import { CreateNewRoadmap } from "@/features/admin/roadmaps/create-new-roadmap";
import { RoadmapsList } from "@/features/admin/roadmaps/roadmaps-list";
import prisma from "@/lib/prisma";

export default async function RoadmapsPage() {
  const roadmaps = await prisma.roadmap.findMany();

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Roadmaps</h1>
          <CreateNewRoadmap />
        </div>
      </AppPageHeader>
      <div>
        <RoadmapsList roadmaps={roadmaps} />
      </div>
    </div>
  );
}
