"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { nextBuybackAmountQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function NextAmountCard({ ...rest }: ComponentProps<"div">) {
  const { notDefaultValue } = useDateFilter();
  const { data } = useQuery(nextBuybackAmountQuery);

  return (
    <GenericCard
      title="Next Buyback Amount"
      description="Real-time estimate based on USDC in Buyback wallet."
      {...rest}
    >
      <div className="relative flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-sm">DYDX</p>

        {notDefaultValue ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold">
            We can’t calculate for the selected range
          </div>
        ) : null}
      </div>
    </GenericCard>
  );
}
