"use client";

import { useState } from "react";

import { ChevronUp, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { FeedbackData } from "./types";

type FeedbackCardProps = {
  feedback: FeedbackData;
};

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const [upvotes, setUpvotes] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Button size="icon" className="h-9 w-9" onClick={handleUpvote}>
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Upvote</span>
          </Button>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                  />
                  <AvatarFallback>
                    {feedback.user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{feedback.user.email}</p>
              </div>
              <Badge variant="secondary">{feedback.roadmap.name}</Badge>
            </div>
            <p className="pl-2 text-sm">{feedback.feedback}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-secondary/10 px-6">
        <div className="text-sm text-muted-foreground">
          {upvotes} upvote{upvotes !== 1 && "s"}
        </div>
        <Button variant="ghost" size="sm" onClick={toggleExpand}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {expanded ? "Hide" : "Show"} Comments
        </Button>
      </CardFooter>
      {expanded && (
        <CardContent className="bg-secondary/20 p-6">
          <div className="space-y-4">
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
    </Card>
  );
}
