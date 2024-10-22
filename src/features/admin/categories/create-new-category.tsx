"use client";

import { Button } from "@/components/ui/button";
import useSheetConfigStore from "@/stores/sheet-config-store";

import { CategoryForm } from "./category-form";

export const CreateNewCategory = () => {
  const { setSheetConfig } = useSheetConfigStore();

  const showCategoryForm = () => {
    setSheetConfig({
      open: true,
      title: "Category",
      description: "Add new category",
      content: <CategoryForm />,
    });
  };

  return <Button onClick={showCategoryForm}>Create New</Button>;
};
