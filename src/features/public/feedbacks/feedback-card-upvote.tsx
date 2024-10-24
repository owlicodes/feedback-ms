"use client";

import { ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/client";

import { useUpvoteFeedback } from "./apis/use-upvote-feedback";

type FeedbackCardUpvoteProps = {
  feedbackId: string;
};

export const FeedbackCardUpvote = ({ feedbackId }: FeedbackCardUpvoteProps) => {
  const upvoteFeedback = useUpvoteFeedback();
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
    <Button variant="outline" size="icon" className="h-9 w-9" onClick={upvote}>
      <ThumbsUp className="h-4 w-4" />
      <span className="sr-only">Upvote</span>
    </Button>
  );
};
