import { AppDataTable } from "@/components/app-data-table";

import { columns } from "./roadmap-table-columns";
import { Roadmap } from "./types";

export const RoadmapsList = ({ roadmaps }: { roadmaps: Roadmap[] }) => {
  return <AppDataTable columns={columns} data={roadmaps} />;
};
