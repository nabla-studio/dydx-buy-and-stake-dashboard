"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { totalUsdBoughtBackQuery } from "@/queries/options";
import { formatShortDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo } from "react";
import { GenericCard } from "./generic-card";

export function TotalUSDCard({ ...rest }: ComponentProps<"div">) {
  const { dates, notDefaultValue } = useDateFilter();
  const { data } = useQuery(totalUsdBoughtBackQuery(dates.from, dates.to));

  const description = useMemo(() => {
    if (notDefaultValue) {
      return `Aggregate value of all buybacks from ${formatShortDate(dates.from)} to ${formatShortDate(dates.to)}.`;
    }

    return "Aggregate value of all buybacks, converted in USD.";
  }, [notDefaultValue, dates]);

  return (
    <GenericCard
      title="Total Value of Buybacks"
      description={description}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-sm">USD</p>
      </div>
    </GenericCard>
  );
}
