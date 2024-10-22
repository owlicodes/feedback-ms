"use client";

import { Button } from "@/components/ui/button";
import useSelectedBoardStore from "@/stores/selected-board-store";

export const BoardInfo = () => {
  const { board } = useSelectedBoardStore();

  if (!board) {
    return (
      <div className="text-center">
        <p>Please select a board.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-center">
      <h2 className="text-lg font-semibold">{board.name}</h2>
      <p className="text-sm text-gray-600">{board.description}</p>
      <Button className="w-full">Make A Suggestion</Button>
    </div>
  );
};
