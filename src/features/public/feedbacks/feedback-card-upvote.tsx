import { ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const FeedbackCardUpvote = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9"
      onClick={() => {}}
    >
      <ThumbsUp className="h-4 w-4" />
      <span className="sr-only">Upvote</span>
    </Button>
  );
};
