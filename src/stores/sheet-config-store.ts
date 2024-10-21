import { create } from "zustand";

export type SheetConfig = {
  open: boolean;
  title: string;
  description: string;
  content: React.ReactNode;
};

interface SheetConfigState {
  sheetConfig: SheetConfig | undefined;
  setSheetConfig: (sheetConfig: SheetConfig | undefined) => void;
}

const useSheetConfigStore = create<SheetConfigState>()((set) => ({
  sheetConfig: undefined,
  setSheetConfig: (sheetConfig) => set(() => ({ sheetConfig })),
}));

export default useSheetConfigStore;
