"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { nextBuybackAmountQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function NextAmountCard({ ...rest }: ComponentProps<"div">) {
  const { notDefaultValue } = useDateFilter();
  const { data, isError } = useQuery(nextBuybackAmountQuery);

  return (
    <GenericCard
      title="Next Buyback Amount"
      description="Real-time estimate based on USDC in Buyback wallet."
      {...rest}
    >
      <div className="relative flex flex-col items-center gap-1 w-full">
        <h3 className="text-foreground text-7xl font-bold">{data ?? "N/A"}</h3>
        <p className="text-primary text-sm">DYDX</p>

        {notDefaultValue && !isError ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            We can’t calculate for the selected range
          </div>
        ) : null}
        {isError ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            Something went wrong
          </div>
        ) : null}
      </div>
    </GenericCard>
  );
}
