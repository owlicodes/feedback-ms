import { Loader } from "lucide-react";

import { Button } from "./ui/button";

type AppSubmitButtonProps = {
  isPending: boolean;
};

export const AppSubmitButton = ({ isPending }: AppSubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full" disabled={isPending}>
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
