import { AppDataTable } from "@/components/app-data-table";

import { columns } from "./category-table-columns";
import { Category } from "./types";

export const CategoriesList = ({ categories }: { categories: Category[] }) => {
  return <AppDataTable columns={columns} data={categories} />;
};
