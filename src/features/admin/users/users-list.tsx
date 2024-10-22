import { AppDataTable } from "@/components/app-data-table";

import { User } from "./types";
import { columns } from "./user-table-columns";

export const UsersList = ({ users }: { users: User[] }) => {
  return <AppDataTable columns={columns} data={users} />;
};
