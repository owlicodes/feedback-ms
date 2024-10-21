"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
];
