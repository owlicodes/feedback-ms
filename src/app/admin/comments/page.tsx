import { AppPageHeader } from "@/components/app-page-header";

export default async function CommentsPage() {
  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Comments</h1>
        </div>
      </AppPageHeader>
      {/* <div>
        <BoardsList boards={boards} />
      </div> */}
    </div>
  );
}
