import { Comment, Feedback, Roadmap, User } from "@prisma/client";

export type FeedbackData = Feedback & { user: User } & { roadmap: Roadmap } & {
  comments: Array<Comment & { user: User }>;
};

export type CreateFeedback = {
  userId: string;
  boardId: string;
  feedback: string;
};

export type CreateComment = {
  comment: string;
  userId: string;
};

export type TCreateUpvote = {
  feedbackId: string;
  userId: string;
};
