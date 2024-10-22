export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCategory = Pick<Category, "name" | "description">;
