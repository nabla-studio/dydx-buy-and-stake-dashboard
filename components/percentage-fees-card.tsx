import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function PercentageFeesCard({ ...rest }: ComponentProps<"div">) {
  return (
    <GenericCard
      title="Fees Allocated to Buybacks"
      description="Share of protocol fees directed to the Buyback Program."
      {...rest}
    >
      <div className="relative w-full flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">25%</h3>
      </div>
    </GenericCard>
  );
}
