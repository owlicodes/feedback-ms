import { Comment, Feedback, Roadmap, Upvote, User } from "@prisma/client";

export type FeedbackData = Feedback & { user: User } & { roadmap: Roadmap } & {
  comments: Array<Comment & { user: User }>;
} & { upvotes: Array<Upvote> };

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
