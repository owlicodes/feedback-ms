"use client";

import { useParams } from "next/navigation";

import { Loader } from "lucide-react";

import { useFeedbackDetails } from "./apis/use-feedback-details";
import { FeedbackForm } from "./feedback-form";

export const FeedbackDetails = () => {
  const { feedbackId } = useParams();
  const feedback = useFeedbackDetails(feedbackId as string);

  if (feedback.isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!feedback.data) {
    return (
      <div>
        <p>
          We were not able to fetch the feedback details. Our team is working on
          it.
        </p>
      </div>
    );
  }

  if (feedback.data) {
    return (
      <div className="bg-white p-4 shadow-md">
        <FeedbackForm data={feedback.data} />
      </div>
    );
  }
};
