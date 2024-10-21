import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center">
      <Loader className="h-5 w-5 animate-spin" />
    </div>
  );
}
