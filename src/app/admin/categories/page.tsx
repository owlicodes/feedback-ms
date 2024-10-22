import { AppPageHeader } from "@/components/app-page-header";
import { CategoriesList } from "@/features/admin/categories/categories-list";
import { CreateNewCategory } from "@/features/admin/categories/create-new-category";
import prisma from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <AppPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Feedback Categories</h1>
          <CreateNewCategory />
        </div>
      </AppPageHeader>
      <div>
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
}
