"use client";

import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Check, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import useAlertDialogConfigStore from "@/stores/alert-dialog-config-store";

import { useApproveComment } from "./apis/use-approve-comment";
import { useDeleteComment } from "./apis/use-delete-comment";
import { TComment } from "./types";

/* eslint-disable react-hooks/rules-of-hooks */

export const columns: ColumnDef<TComment>[] = [
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "user.name",
    header: "User Name",
  },
  {
    accessorKey: "user.email",
    header: "User Email",
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => {
      const approved = row.getValue("approved") as boolean;
      const displayText = approved ? "Yes" : "No";

      return <div>{displayText}</div>;
    },
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
      const comment = row.original;
      const { setAlertDialogConfig } = useAlertDialogConfigStore();
      const { toast } = useToast();
      const router = useRouter();
      const deleteComment = useDeleteComment();
      const approveComment = useApproveComment();

      const approve = () => {
        approveComment.mutate(comment.id, {
          onSuccess: (data) => {
            toast({
              title: "Approve Comment",
              description: data.message,
            });
            router.refresh();
          },
          onError: (error) => {
            toast({
              title: "Approve Comment",
              description: error.message,
              variant: "destructive",
            });
          },
        });
      };

      const showDeleteAlertDialog = () => {
        setAlertDialogConfig({
          open: true,
          title: "Are you sure you want to delete comment?",
          onDelete: async () => {
            deleteComment.mutate(comment.id, {
              onSuccess: (data) => {
                toast({
                  title: "Delete Comment",
                  description: data.message,
                });
                router.refresh();
                setAlertDialogConfig(undefined);
              },
              onError: (error) => {
                toast({
                  title: "Delete Comment",
                  description: error.message,
                  variant: "destructive",
                });
                setAlertDialogConfig(undefined);
              },
            });
          },
        });
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
            <DropdownMenuItem className="cursor-pointer" onClick={approve}>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Approve</span>
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
