import { FeedbackStatus } from "@prisma/client";

export type Feedback = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  categoryId: string | null;
  categoryName: string | undefined;
  roadmapId: string | null;
  roadmapName: string | undefined;
  status: string;
  createdAt: Date;
  boardId: string;
  boardName: string;
  feedback: string;
};

export type UpdateFeedback = {
  roadmapId: string | null;
  categoryId: string | null;
  boardId: string | null;
  status: FeedbackStatus;
};
