export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCategory = Pick<Category, "name" | "description">;
export type UpdateCategory = Pick<Category, "name" | "description">;
