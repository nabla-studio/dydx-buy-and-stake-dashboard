"use client";

import { stakingBalanceQuery } from "@/queries/options";
import { dateFilterParsers } from "@/state/date-filter";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function AmountStakedCard({ ...rest }: ComponentProps<"div">) {
  const [dates] = useQueryStates(dateFilterParsers);
  const { data } = useQuery(stakingBalanceQuery(dates.from, dates.to));

  const notDefaultValue =
    dateFilterParsers.from.defaultValue.getTime() !== dates.from.getTime() &&
    dateFilterParsers.to.defaultValue.getTime() !== dates.to.getTime();

  return (
    <GenericCard
      title="Staked via Buyback Program"
      description="DYDX staked through Treasury SubDAO buybacks."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">
          {!data?.first && !data?.last
            ? "N/A"
            : notDefaultValue
              ? data.first !== data.last
                ? `${data.first} - ${data.last}`
                : "0"
              : data.last}
        </h3>
        <p className="text-primary text-sm">DYDX</p>
      </div>
    </GenericCard>
  );
}
