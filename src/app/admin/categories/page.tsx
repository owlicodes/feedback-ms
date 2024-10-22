import { AppPageHeader } from "@/components/app-page-header";
import { CreateNewCategory } from "@/features/admin/categories/create-new-category";

export default function CategoriesPage() {
  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Categories</h1>
          <CreateNewCategory />
        </div>
      </AppPageHeader>
    </div>
  );
}
