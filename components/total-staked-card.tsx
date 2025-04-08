"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { stakingSupplyQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function TotalStakedCard({ ...rest }: ComponentProps<"div">) {
  const { dates } = useDateFilter();
  const { data, isError } = useQuery(stakingSupplyQuery(dates.from, dates.to));

  return (
    <GenericCard
      title="Total Staked"
      description="Total DYDX currently staked across the entire network."
      {...rest}
    >
      <div className="relative w-full flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data ?? "N/A"}</h3>
        <p className="text-primary text-sm">DYDX</p>

        {isError ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            Something went wrong
          </div>
        ) : null}
      </div>
    </GenericCard>
  );
}
