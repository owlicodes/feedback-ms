export type Board = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBoard = Pick<Board, "name" | "description">;
export type UpdateBoard = CreateBoard;
