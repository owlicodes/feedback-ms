import { AppPageHeader } from "@/components/app-page-header";
import { CommentsList } from "@/features/admin/comments/comments-list";
import prisma from "@/lib/prisma";

export default async function CommentsPage() {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Comments</h1>
        </div>
      </AppPageHeader>
      <div>
        <CommentsList comments={comments} />
      </div>
    </div>
  );
}
