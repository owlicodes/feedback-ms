"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useSheetConfigStore from "@/stores/sheet-config-store";

import { useCreateRoadmap } from "./apis/use-create-roadmap";
import { Roadmap } from "./types";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required.",
  }),
  description: z.string().trim().min(1, {
    message: "Description is required.",
  }),
});

export const RoadmapForm = ({ data }: { data?: Roadmap }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data ? data.name : "",
      description: data ? data.description : "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const { setSheetConfig } = useSheetConfigStore();
  const createRoadmap = useCreateRoadmap();

  const onSuccessHandler = (title: string, description: string) => {
    toast({
      title,
      description,
    });

    router.refresh();

    setSheetConfig(undefined);
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
    if (data) {
      // updateCategory.mutate(
      //   {
      //     id: data.id,
      //     data: values,
      //   },
      //   {
      //     onSuccess: (data) => {
      //       onSuccessHandler("Update Category", data.message);
      //     },
      //     onError: (error) => {
      //       onErrorHandler("Update Category", error.message);
      //     },
      //   }
      // );
    } else {
      createRoadmap.mutate(values, {
        onSuccess: (data) => {
          onSuccessHandler("Create Roadmap", data.message);
        },
        onError: (error) => {
          onErrorHandler("Create Roadmap", error.message);
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={createRoadmap.isPending}
        >
          {createRoadmap.isPending ? (
            <span className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};
