"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAlertDialogConfigStore from "@/stores/alert-dialog-config-store";

export const AppAlertDialog = () => {
  const { alertDialogConfig, setAlertDialogConfig } =
    useAlertDialogConfigStore();

  if (!alertDialogConfig) {
    return null;
  }

  const onDelete = () => {
    alertDialogConfig.onDelete();
  };

  return (
    <AlertDialog
      open={alertDialogConfig.open}
      onOpenChange={() => setAlertDialogConfig(undefined)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialogConfig.title}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            record and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500/80"
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
