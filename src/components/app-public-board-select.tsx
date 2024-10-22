"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Board } from "@/features/admin/boards/types";
import useSelectedBoardStore from "@/stores/selected-board-store";

export const AppPublicBoardSelect = ({ boards }: { boards: Board[] }) => {
  const { setBoard } = useSelectedBoardStore();

  const selectBoard = (id: string) => {
    const board = boards.find((board) => board.id === id);
    setBoard(board);
  };

  return (
    <Select onValueChange={selectBoard}>
      <SelectTrigger className="w-[500px]">
        <SelectValue placeholder="Select Board" />
      </SelectTrigger>
      <SelectContent>
        {boards.map((board) => (
          <SelectItem key={board.id} value={board.id}>
            {board.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
