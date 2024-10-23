import { Comment, User } from "@prisma/client";

export type TComment = Comment & { user: User };
