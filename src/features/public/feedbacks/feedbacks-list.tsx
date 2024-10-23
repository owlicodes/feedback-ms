"use client";

import { Loader } from "lucide-react";

import useSelectedBoardStore from "@/stores/selected-board-store";

import { useBoardFeedbacks } from "./apis/use-board-feedbacks";
import FeedbackCard from "./feedback-card";

export const FeedbacksList = () => {
  const { board } = useSelectedBoardStore();
  const feedbacks = useBoardFeedbacks(board?.id);

  if (feedbacks.isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!feedbacks.data) {
    return (
      <div>
        <p>No feedbacks yet.</p>
      </div>
    );
  }

  return (
    <div>
      {feedbacks.data.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
};
