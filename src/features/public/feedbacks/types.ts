import { Feedback, Roadmap, User } from "@prisma/client";

export type FeedbackData = Feedback & { user: User } & { roadmap: Roadmap };

export type CreateFeedback = {
  userId: string;
  boardId: string;
  feedback: string;
};
