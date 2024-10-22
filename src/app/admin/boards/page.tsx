import { AppPageHeader } from "@/components/app-page-header";
import { CreateNewBoard } from "@/features/admin/boards/create-new-board";

export default async function BoardsPage() {
  // const boards = await prisma.board.findMany();

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Boards</h1>
          <CreateNewBoard />
        </div>
      </AppPageHeader>
      <div>{/* <RoadmapsList roadmaps={roadmaps} /> */}</div>
    </div>
  );
}
