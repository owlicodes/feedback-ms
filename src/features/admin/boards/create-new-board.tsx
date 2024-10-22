"use client";

import { Button } from "@/components/ui/button";
import useSheetConfigStore from "@/stores/sheet-config-store";

import { BoardForm } from "./board-form";

export const CreateNewBoard = () => {
  const { setSheetConfig } = useSheetConfigStore();

  const showBoardForm = () => {
    setSheetConfig({
      open: true,
      title: "Board",
      description: "Add new board",
      content: <BoardForm />,
    });
  };

  return <Button onClick={showBoardForm}>Create New</Button>;
};
