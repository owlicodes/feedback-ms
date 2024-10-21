import { create } from "zustand";

export type AlertDialogConfig = {
  open: boolean;
  title: string;
  onDelete: () => void;
};

interface AlertDialogConfigState {
  alertDialogConfig: AlertDialogConfig | undefined;
  setAlertDialogConfig: (
    alertDialogConfig: AlertDialogConfig | undefined
  ) => void;
}

const useAlertDialogConfigStore = create<AlertDialogConfigState>()((set) => ({
  alertDialogConfig: undefined,
  setAlertDialogConfig: (alertDialogConfig) =>
    set(() => ({ alertDialogConfig })),
}));

export default useAlertDialogConfigStore;
