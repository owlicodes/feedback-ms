import { headers } from "next/headers";

import { AppPublicHeader } from "@/components/app-public-header";
import { BoardInfo } from "@/features/public/feedbacks/board-info";
import { FeedbacksList } from "@/features/public/feedbacks/feedbacks-list";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

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
          <BoardInfo userId={session?.user.id} />
        </div>
      </div>
    </div>
  );
}
