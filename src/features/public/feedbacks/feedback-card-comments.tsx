"use client";

import { useState } from "react";

import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

import { FeedbackCardCommentForm } from "./feedback-card-comment-form";

export const FeedbackCardComments = ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const [expanded, setExpanded] = useState(false);

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
          <FeedbackCardCommentForm feedbackId={feedbackId} />
          <div className="mt-8 space-y-4">
            <p className="text-sm">
              <strong>User1:</strong> Great post! Very insightful.
            </p>
            <p className="text-sm">
              <strong>User2:</strong> I have a question about this. Can you
              elaborate?
            </p>
            <p className="text-sm">
              <strong>User3:</strong> Thanks for sharing your thoughts on this
              topic.
            </p>
          </div>
        </CardContent>
      )}
    </>
  );
};
