"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { stakingBalanceQuery } from "@/queries/options";
import { formatShortDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo } from "react";
import { GenericCard } from "./generic-card";

export function AmountStakedCard({ ...rest }: ComponentProps<"div">) {
  const { dates, notDefaultValue } = useDateFilter();
  const { data, isError } = useQuery(stakingBalanceQuery(dates.from, dates.to));

  const description = useMemo(() => {
    if (notDefaultValue) {
      return `DYDX staked through buybacks from ${formatShortDate(dates.from)} to ${formatShortDate(dates.to)}.`;
    }

    return "DYDX staked through Treasury SubDAO buybacks.";
  }, [notDefaultValue, dates]);

  return (
    <GenericCard
      title="Total DYDX Staked from Buybacks"
      description={description}
      {...rest}
    >
      <div className="relative w-full flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">
          {!data?.last ? "N/A" : data.last}
        </h3>
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
