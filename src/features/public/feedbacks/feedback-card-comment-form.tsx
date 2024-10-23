"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AppSubmitButton } from "@/components/app-submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { useCreateFeedbackComment } from "./apis/use-create-feedback-comment";

const formSchema = z.object({
  comment: z.string().trim().min(1, {
    message: "Comment is required.",
  }),
});

export const FeedbackCardCommentForm = ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });
  const { toast } = useToast();
  const createdFeedbackComment = useCreateFeedbackComment();

  const onSuccessHandler = (title: string, description: string) => {
    toast({
      title,
      description,
    });

    form.reset();
  };

  const onErrorHandler = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createdFeedbackComment.mutate(
      {
        feedbackId,
        data: {
          comment: values.comment,
        },
      },
      {
        onSuccess: (data) => {
          onSuccessHandler("Create Category", data.message);
        },
        onError: (error) => {
          onErrorHandler("Create Category", error.message);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea rows={5} className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                Your comment will be reviewed by our admins before it can appear
                in the feedback. Thank you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AppSubmitButton
          isPending={createdFeedbackComment.isPending}
          classNames="w-fit"
        />
      </form>
    </Form>
  );
};
