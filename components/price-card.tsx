"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { dydxPriceQuery } from "@/queries/options";
import { formatShortDate } from "@/utils/date";
import { formatPercentageNumber } from "@/utils/number";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";
import { type ComponentProps, useMemo } from "react";
import { GenericCard } from "./generic-card";

const Footer = () => {
  const { dates, notDefaultValue } = useDateFilter();

  const { data } = useQuery({
    ...dydxPriceQuery(dates.from, dates.to),
    select(points) {
      if (!points || points.length === 0) return undefined;

      const point = [...points].pop();

      if (!point) {
        return {
          value: undefined,
          isPositive: true,
        };
      }

      const yesterdayDate = new Date(point.labels);
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      const yesterdayPoint = points.find((p) => {
        const pointDate = new Date(p.labels);

        return pointDate.getTime() === yesterdayDate.getTime();
      });

      if (!yesterdayPoint) {
        return {
          value: undefined,
          isPositive: true,
        };
      }

      const priceDifference = point.priceDYDX - yesterdayPoint.priceDYDX;
      const percentageChange = priceDifference / yesterdayPoint.priceDYDX;

      return {
        value: formatPercentageNumber(percentageChange),
        isPositive: percentageChange >= 0,
      };
    },
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2 font-medium leading-none">
        Trending {data?.isPositive ? "up" : "down"} by {data?.value}{" "}
        {notDefaultValue ? "in this interval" : "today"}{" "}
        {data?.isPositive ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
      </div>
    </>
  );
};

export function PriceCard({ ...rest }: ComponentProps<"div">) {
  const { dates, notDefaultValue } = useDateFilter();
  const { data } = useQuery(dydxPriceQuery(dates.from, dates.to));

  const description = useMemo(() => {
    if (notDefaultValue) {
      return `Market price of DYDX from ${formatShortDate(dates.from)} to ${formatShortDate(dates.to)}.`;
    }

    return "Live market price of DYDX.";
  }, [notDefaultValue, dates]);

  return (
    <GenericCard
      title="DYDX Price"
      description={description}
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">
          {!data?.first && !data?.last ? (
            "N/A"
          ) : notDefaultValue ? (
            <span className="flex flex-col items-center">
              {data.first}
              <span>-</span>
              {data.last}
            </span>
          ) : (
            data.last
          )}
        </h3>
        <p className="text-primary text-sm">USD</p>
      </div>
    </GenericCard>
  );
}
