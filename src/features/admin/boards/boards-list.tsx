import { AppDataTable } from "@/components/app-data-table";

import { columns } from "./board-table-columns";
import { Board } from "./types";

export const BoardsList = ({ boards }: { boards: Board[] }) => {
  return <AppDataTable columns={columns} data={boards} />;
};
