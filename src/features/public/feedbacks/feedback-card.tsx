"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/lib/client";

import { FeedbackCardAvatar } from "./feedback-card-avatar";
import { FeedbackCardComments } from "./feedback-card-comments";
import { FeedbackCardUpvote } from "./feedback-card-upvote";
import { FeedbackData } from "./types";

type FeedbackCardProps = {
  feedback: FeedbackData;
};

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const session = client.useSession();

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {session.data?.user && (
            <FeedbackCardUpvote feedbackId={feedback.id} />
          )}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FeedbackCardAvatar email={feedback.user.email} />
                <p className="text-sm font-medium">{feedback.user.email}</p>
              </div>
              <Badge variant="secondary">{feedback.roadmap?.name}</Badge>
            </div>
            <p className="pl-2 text-sm">{feedback.feedback}</p>
          </div>
        </div>
      </CardContent>
      <FeedbackCardComments
        feedbackId={feedback.id}
        comments={feedback.comments}
      />
    </Card>
  );
}
