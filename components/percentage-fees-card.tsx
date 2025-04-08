"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { buybackFeeShareQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function PercentageFeesCard({ ...rest }: ComponentProps<"div">) {
  const { dates, notDefaultValue } = useDateFilter();
  const { data, isError } = useQuery(
    buybackFeeShareQuery(dates.from, dates.to),
  );

  return (
    <GenericCard
      title="Fees Allocated to Buybacks"
      description="Share of protocol fees directed to the Buyback Program."
      {...rest}
    >
      <div className="relative w-full flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">
          {!data?.first && !data?.last ? (
            "N/A"
          ) : notDefaultValue ? (
            data.first !== data.last ? (
              <span className="flex flex-col items-center">
                {data.first}
                <span>-</span>
                {data.last}
              </span>
            ) : (
              "0"
            )
          ) : (
            data.last
          )}
        </h3>

        {isError ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            Something went wrong
          </div>
        ) : null}
      </div>
    </GenericCard>
  );
}
