"use client";

import { ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/client";
import useSelectedBoardStore from "@/stores/selected-board-store";

import { useUpvoteFeedback } from "./apis/use-upvote-feedback";

type FeedbackCardUpvoteProps = {
  feedbackId: string;
  isUpvoted: boolean;
};

export const FeedbackCardUpvote = ({
  feedbackId,
  isUpvoted,
}: FeedbackCardUpvoteProps) => {
  const { board } = useSelectedBoardStore();
  const upvoteFeedback = useUpvoteFeedback(board?.id);
  const session = client.useSession();
  const { toast } = useToast();

  const upvote = () => {
    const userId = session.data?.user.id;

    if (userId) {
      upvoteFeedback.mutate(
        {
          feedbackId,
          userId,
        },
        {
          onSuccess: (data) => {
            toast({
              title: "Upvote",
              description: data.message,
            });
          },
          onError: (error) => {
            toast({
              title: "Upvote",
              description: error.message,
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 bg-blue-600 text-white"
      onClick={upvote}
      disabled={isUpvoted}
    >
      <ThumbsUp className="h-4 w-4" />
      <span className="sr-only">Upvote</span>
    </Button>
  );
};
