import { create } from "zustand";

import { Board } from "@/features/admin/boards/types";

interface SelectedBoardState {
  board: Board | undefined;
  setBoard: (board: Board | undefined) => void;
}

const useSelectedBoardStore = create<SelectedBoardState>()((set) => ({
  board: undefined,
  setBoard: (board) => set(() => ({ board })),
}));

export default useSelectedBoardStore;
