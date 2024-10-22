"use client";

import { Button } from "@/components/ui/button";
import useSheetConfigStore from "@/stores/sheet-config-store";

import { RoadmapForm } from "./roadmap-form";

export const CreateNewRoadmap = () => {
  const { setSheetConfig } = useSheetConfigStore();

  const showRoadmapForm = () => {
    setSheetConfig({
      open: true,
      title: "Roadmap",
      description: "Add new roadmap",
      content: <RoadmapForm />,
    });
  };

  return <Button onClick={showRoadmapForm}>Create New</Button>;
};
