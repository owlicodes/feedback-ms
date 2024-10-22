"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSelectedBoardStore from "@/stores/selected-board-store";

import { FeedbackForm } from "./feedback-form";

export const BoardInfo = () => {
  const { board } = useSelectedBoardStore();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  if (!board) {
    return (
      <div className="text-center">
        <p>Please select a board.</p>
      </div>
    );
  }

  return (
    <>
      <Dialog
        open={isFormDialogOpen}
        onOpenChange={() => setIsFormDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make A Suggestion</DialogTitle>
            <DialogDescription>
              Please help us improve our systems by providing your opinions or
              suggestions.
            </DialogDescription>
          </DialogHeader>

          <FeedbackForm />
        </DialogContent>
      </Dialog>

      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold">{board.name}</h2>
        <p className="text-sm text-gray-600">{board.description}</p>
        <Button className="w-full" onClick={() => setIsFormDialogOpen(true)}>
          Make A Suggestion
        </Button>
      </div>
    </>
  );
};
