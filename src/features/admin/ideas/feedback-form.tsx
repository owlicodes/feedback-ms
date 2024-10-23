"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AppSubmitButton } from "@/components/app-submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { useBoards } from "../boards/apis/use-boards";
import { useCategories } from "../categories/apis/use-categories";
import { useRoadmaps } from "../roadmaps/apis/use-roadmaps";
import { useUpdateFeedback } from "./apis/use-update-feedback";
import { Feedback } from "./types";

const formSchema = z.object({
  userName: z.string().trim().min(1, {
    message: "User name is required.",
  }),
  userEmail: z
    .string()
    .trim()
    .min(1, {
      message: "User email is required.",
    })
    .email({
      message: "Invalid email.",
    }),
  feedback: z.string().min(1, {
    message: "Feedback is required.",
  }),
  roadmapId: z.string().nullable(),
  categoryId: z.string().nullable(),
  boardId: z.string(),
  status: z.boolean().default(false).optional(),
});

export const FeedbackForm = ({ data }: { data: Feedback }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: data ? data.userName : "",
      userEmail: data ? data.userEmail : "",
      feedback: data ? data.feedback : "",
      roadmapId: data ? data.roadmapId : "",
      categoryId: data ? data.categoryId : "",
      boardId: data ? data.boardId : "",
      status: data && data.status !== "PENDING",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const roadmaps = useRoadmaps();
  const categories = useCategories();
  const boards = useBoards();
  const updateFeedback = useUpdateFeedback();

  const onSuccessHandler = (title: string, description: string) => {
    toast({
      title,
      description,
    });

    router.refresh();
  };

  const onErrorHandler = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    updateFeedback.mutate(
      {
        id: data.id,
        data: {
          boardId: values.boardId,
          categoryId: values.categoryId,
          roadmapId: values.roadmapId,
          status: values.status ? "APPROVED" : "PENDING",
        },
      },
      {
        onSuccess: (data) => {
          onSuccessHandler("Update Feedback", data.message);
        },
        onError: (error) => {
          onErrorHandler("Update Feedback", error.message);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full items-center gap-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    className="pointer-events-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>User Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    className="pointer-events-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="pointer-events-none resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center gap-4">
          <FormField
            control={form.control}
            name="roadmapId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Roadmap Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roadmaps.data?.map((roadmap) => (
                      <SelectItem key={roadmap.id} value={roadmap.id}>
                        {roadmap.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value : undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.data?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="boardId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Board</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Board" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {boards.data?.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Check this box if you want to approve the feedback.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <AppSubmitButton
          isPending={updateFeedback.isPending}
          classNames="w-fit"
        />
      </form>
    </Form>
  );
};
