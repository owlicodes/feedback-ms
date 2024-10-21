"use client";

import { Button } from "@/components/ui/button";
import useSheetConfigStore from "@/stores/sheet-config-store";

import { StaffMemberForm } from "./staff-member-form";

export const CreateNewButton = () => {
  const { setSheetConfig } = useSheetConfigStore();

  const showStaffMemberForm = () => {
    setSheetConfig({
      open: true,
      title: "Staff Member",
      description: "Add a new staff member",
      content: <StaffMemberForm />,
    });
  };

  return <Button onClick={showStaffMemberForm}>Create New</Button>;
};
