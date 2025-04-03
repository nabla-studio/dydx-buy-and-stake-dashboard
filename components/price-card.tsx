"use client";

import { dydxPriceQuery } from "@/queries/options";
import { dateFilterParsers } from "@/state/date-filter";
import { formatPercentageNumber } from "@/utils/number";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useQueryStates } from "nuqs";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

const Footer = () => {
  const [dates] = useQueryStates(dateFilterParsers);

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
        Trending {data?.isPositive ? "up" : "down"} by {data?.value} this day{" "}
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
  const [dates] = useQueryStates(dateFilterParsers);
  const { data } = useQuery(dydxPriceQuery(dates.from, dates.to));

  const notDefaultValue =
    dateFilterParsers.from.defaultValue.getTime() !== dates.from.getTime() &&
    dateFilterParsers.to.defaultValue.getTime() !== dates.to.getTime();

  return (
    <GenericCard
      title="DYDX Price"
      description="Live market price of DYDX."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">
          {!data?.first && !data?.last
            ? "N/A"
            : notDefaultValue
              ? `${data.first} - ${data.last}`
              : data.last}
        </h3>
        <p className="text-primary text-sm">USD</p>
      </div>
    </GenericCard>
  );
}
