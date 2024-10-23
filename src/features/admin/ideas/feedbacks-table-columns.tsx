"use client";

import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import useAlertDialogConfigStore from "@/stores/alert-dialog-config-store";

import { useDeleteFeedback } from "./apis/use-delete-feedback";
import { Feedback } from "./types";

/* eslint-disable react-hooks/rules-of-hooks */

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "boardName",
    header: "Board",
  },
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "userEmail",
    header: "User Email",
  },
  {
    accessorKey: "roadmapName",
    header: "Status",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Approval Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      const formatted = format(createdAt, "PPPP");

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const feedback = row.original;
      const { setAlertDialogConfig } = useAlertDialogConfigStore();
      const { toast } = useToast();
      const router = useRouter();
      const deleteFeedback = useDeleteFeedback();

      const showDeleteAlertDialog = () => {
        setAlertDialogConfig({
          open: true,
          title: `Are you sure you want to delete feedback from ${feedback.userEmail}?`,
          onDelete: async () => {
            deleteFeedback.mutate(feedback.id, {
              onSuccess: (data) => {
                toast({
                  title: "Delete Feedback",
                  description: data.message,
                });
                router.refresh();
                setAlertDialogConfig(undefined);
              },
              onError: (error) => {
                toast({
                  title: "Delete Feedback",
                  description: error.message,
                  variant: "destructive",
                });
                setAlertDialogConfig(undefined);
              },
            });
          },
        });
      };

      const showFeedbackActionForm = () => {
        router.push(`/admin/ideas/${feedback.id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={showFeedbackActionForm}
            >
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>View Feedback</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={showDeleteAlertDialog}
            >
              <div className="flex items-center gap-2 text-red-500">
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
