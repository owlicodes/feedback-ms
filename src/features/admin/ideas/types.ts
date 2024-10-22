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
};
