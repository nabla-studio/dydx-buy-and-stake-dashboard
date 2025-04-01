"use client";

import { buybackFeeShareQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function PercentageFeesCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(buybackFeeShareQuery);

  return (
    <GenericCard
      title="% of Fees Allocated to Buybacks"
      description="Share of protocol fees directed to the Buyback Program."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
      </div>
    </GenericCard>
  );
}
