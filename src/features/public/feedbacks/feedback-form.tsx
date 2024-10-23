"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AppSubmitButton } from "@/components/app-submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useSelectedBoardStore from "@/stores/selected-board-store";

import { useCreateFeedback } from "./apis/use-create-feedback";

const formSchema = z.object({
  feedback: z.string().trim().min(1, {
    message: "Feedback is required.",
  }),
});

type FeedbackFormProps = {
  userId: string;
  closeFormDialog: () => void;
};

export const FeedbackForm = ({
  userId,
  closeFormDialog,
}: FeedbackFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const createFeedback = useCreateFeedback();
  const { board } = useSelectedBoardStore();

  const onSuccessHandler = (title: string, description: string) => {
    toast({
      title,
      description,
    });

    router.refresh();

    closeFormDialog();
  };

  const onErrorHandler = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    createFeedback.mutate(
      {
        userId,
        boardId: board!.id,
        feedback: values.feedback,
      },
      {
        onSuccess: (data) => {
          onSuccessHandler("Create Feedback", data.message);
        },
        onError: (error) => {
          onErrorHandler("Create Feedback", error.message);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea rows={10} className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AppSubmitButton isPending={createFeedback.isPending} />
      </form>
    </Form>
  );
};
