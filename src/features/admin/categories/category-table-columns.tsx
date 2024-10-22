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
import useAlertDialogConfigStore from "@/stores/alert-dialog-config-store";

import { Category } from "./types";

/* eslint-disable react-hooks/rules-of-hooks */

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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
      const category = row.original;
      const { setAlertDialogConfig } = useAlertDialogConfigStore();
      const { toast } = useToast();
      const router = useRouter();

      const showDeleteAlertDialog = () => {
        setAlertDialogConfig({
          open: true,
          title: `Are you sure you want to delete ${category.name}?`,
          onDelete: async () => {
            console.log("Proceed with deletion...");
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
