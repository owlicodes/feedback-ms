"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSheetConfigStore from "@/stores/sheet-config-store";

export const AppSheet = () => {
  const { sheetConfig, setSheetConfig } = useSheetConfigStore();

  if (!sheetConfig) {
    return null;
  }

  return (
    <Sheet
      open={sheetConfig.open}
      onOpenChange={() => setSheetConfig(undefined)}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{sheetConfig.title}</SheetTitle>
          <SheetDescription>{sheetConfig.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-4">{sheetConfig.content}</div>
      </SheetContent>
    </Sheet>
  );
};
