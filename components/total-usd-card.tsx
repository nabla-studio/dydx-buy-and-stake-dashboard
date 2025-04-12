"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { totalUsdBoughtBackQuery } from "@/queries/options";
import { formatShortDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo } from "react";
import { GenericCard } from "./generic-card";

export function TotalUSDCard({ ...rest }: ComponentProps<"div">) {
  const { dates, notDefaultValue } = useDateFilter();
  const { data, isError } = useQuery(
    totalUsdBoughtBackQuery(dates.from, dates.to),
  );

  const description = useMemo(() => {
    if (notDefaultValue) {
      return `Aggregate value of all Buybacks from ${formatShortDate(dates.from)} to ${formatShortDate(dates.to)}.`;
    }

    return "Aggregate value of all Buybacks, converted in USD.";
  }, [notDefaultValue, dates]);

  return (
    <GenericCard
      title="Market Value of DYDX Buybacks"
      description={description}
      {...rest}
    >
      <div className="relative w-full flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">
          {data ? `${data} $` : "N/A"}
        </h3>
        <p className="text-primary text-sm">USD</p>

        {isError ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            Something went wrong
          </div>
        ) : null}
      </div>
    </GenericCard>
  );
}
