import { AppDataTable } from "@/components/app-data-table";

import { columns } from "./feedbacks-table-columns";
import { Feedback } from "./types";

export const FeedbacksList = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  return <AppDataTable columns={columns} data={feedbacks} />;
};
