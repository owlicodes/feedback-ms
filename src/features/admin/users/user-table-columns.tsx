"use client";

import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/client";
import useAlertDialogConfigStore from "@/stores/alert-dialog-config-store";

import { User } from "./types";

/* eslint-disable react-hooks/rules-of-hooks */

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Member Since",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      const formatted = format(createdAt, "PPPP");

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { setAlertDialogConfig } = useAlertDialogConfigStore();
      const { toast } = useToast();
      const router = useRouter();

      const showDeleteAlertDialog = () => {
        setAlertDialogConfig({
          open: true,
          title: `Are you sure you want to delete ${user.name}?`,
          onDelete: async () => {
            await client.admin.removeUser(
              {
                userId: user.id,
              },
              {
                onSuccess: () => {
                  toast({
                    title: "Delete User",
                    description: "User successfully deleted.",
                  });

                  router.refresh();
                },
                onError: (ctx) => {
                  toast({
                    title: "Delete User",
                    description: ctx.error.message,
                  });
                },
              }
            );
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
