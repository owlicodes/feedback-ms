/* eslint-disable react-hooks/rules-of-hooks */
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

/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable react-hooks/rules-of-hooks */

export type StaffMember = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const columns: ColumnDef<StaffMember>[] = [
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
      const staffMember = row.original;
      const { setAlertDialogConfig } = useAlertDialogConfigStore();
      const { toast } = useToast();
      const router = useRouter();

      const showDeleteAlertDialog = () => {
        setAlertDialogConfig({
          open: true,
          title: `Are you sure you want to delete ${staffMember.email}?`,
          onDelete: async () => {
            await client.admin.removeUser(
              {
                userId: staffMember._id,
              },
              {
                onSuccess: () => {
                  toast({
                    title: "Delete Staff Member",
                    description: "Staff member successfully deleted.",
                  });

                  router.refresh();
                },
                onError: (ctx) => {
                  toast({
                    title: "Delete Staff Member",
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
