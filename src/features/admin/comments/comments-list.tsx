import { AppDataTable } from "@/components/app-data-table";

import { columns } from "./comment-table-columns";
import { TComment } from "./types";

export const CommentsList = ({ comments }: { comments: TComment[] }) => {
  return <AppDataTable columns={columns} data={comments} />;
};
