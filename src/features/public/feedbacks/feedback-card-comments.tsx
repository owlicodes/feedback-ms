"use client";

import { useState } from "react";

import { Comment, User } from "@prisma/client";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";

import { FeedbackCardCommentForm } from "./feedback-card-comment-form";

export const FeedbackCardComments = ({
  feedbackId,
  comments,
}: {
  feedbackId: string;
  comments: Array<Comment & { user: User }>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const session = client.useSession();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardFooter className="flex items-center justify-between bg-secondary/10 px-6">
        <div className="text-sm text-muted-foreground">0 upvote</div>
        <Button variant="ghost" size="sm" onClick={toggleExpand}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {expanded ? "Hide" : "Show"} Comments
        </Button>
      </CardFooter>
      {expanded && (
        <CardContent className="bg-secondary/20 p-6">
          {session.data?.user && (
            <FeedbackCardCommentForm feedbackId={feedbackId} />
          )}
          <div className={cn("space-y-4", session.data?.user && "mt-8")}>
            {comments.map((comment) => (
              <p key={comment.id} className="text-sm">
                <strong>{comment.user?.email}:</strong> {comment.comment}
              </p>
            ))}
          </div>
        </CardContent>
      )}
    </>
  );
};
