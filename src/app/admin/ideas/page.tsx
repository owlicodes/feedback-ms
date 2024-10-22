import { AppPageHeader } from "@/components/app-page-header";
import { FeedbacksList } from "@/features/admin/ideas/feedback-list";
import { Feedback } from "@/features/admin/ideas/types";
import prisma from "@/lib/prisma";

export default async function IdeasPage() {
  const feedbacks = await prisma.feedback.findMany({
    include: {
      user: true,
      roadmap: true,
      category: true,
    },
  });

  const buildFeedbacks = (): Feedback[] => {
    if (!feedbacks) return [];

    return feedbacks.map((feedback) => ({
      id: feedback.id,
      userId: feedback.userId,
      userName: feedback.user.name,
      userEmail: feedback.user.email,
      categoryId: feedback.categoryId,
      categoryName: feedback.category?.name,
      createdAt: feedback.createdAt,
      roadmapId: feedback.roadmapId,
      roadmapName: feedback.roadmap?.name,
      status: feedback.status,
    }));
  };

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Ideas</h1>
        </div>
      </AppPageHeader>
      <div>
        <FeedbacksList feedbacks={buildFeedbacks()} />
      </div>
    </div>
  );
}
