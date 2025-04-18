import { Loader2 } from "lucide-react";

export const ChartLoader = () => (
  <div className="flex left-0 top-0 absolute w-full h-full justify-center items-center">
    <Loader2 className="size-14 animate-spin" />
  </div>
);
