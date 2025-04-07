"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { totalDydxBoughtBackQuery } from "@/queries/options";
import { formatShortDate } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo } from "react";
import { GenericCard } from "./generic-card";

export function TotalDydxCard({ ...rest }: ComponentProps<"div">) {
  const { dates, notDefaultValue } = useDateFilter();
  const { data } = useQuery(totalDydxBoughtBackQuery(dates.from, dates.to));

  const description = useMemo(() => {
    if (notDefaultValue) {
      return `Cumulative DYDX repurchased from ${formatShortDate(dates.from)} to ${formatShortDate(dates.to)}`;
    }

    return "Cumulative DYDX repurchased since program launch.";
  }, [notDefaultValue, dates]);

  return (
    <GenericCard title="Total Bought Back" description={description} {...rest}>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-sm">DYDX</p>
      </div>
    </GenericCard>
  );
}
