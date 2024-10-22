import { AppPublicHeader } from "@/components/app-public-header";
import { BoardInfo } from "@/features/public/feedbacks/board-info";
import { FeedbacksList } from "@/features/public/feedbacks/feedbacks-list";

export default function Home() {
  return (
    <div>
      <div className="bg-white py-4 shadow-md">
        <AppPublicHeader />
      </div>
      <div className="mx-auto mt-8 flex max-w-6xl gap-8">
        <div className="basis-2/3 bg-white p-4 shadow-md">
          <FeedbacksList />
        </div>
        <div className="h-fit basis-1/3 bg-white p-4 shadow-md">
          <BoardInfo />
        </div>
      </div>
    </div>
  );
}
