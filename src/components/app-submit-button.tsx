import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

type AppSubmitButtonProps = {
  isPending: boolean;
  classNames?: string;
};

export const AppSubmitButton = ({
  isPending,
  classNames,
}: AppSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn("w-full", classNames)}
      disabled={isPending}
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <Loader className="h-4 w-4 animate-spin" />
          <span>Submitting...</span>
        </span>
      ) : (
        "Submit"
      )}
    </Button>
  );
};
