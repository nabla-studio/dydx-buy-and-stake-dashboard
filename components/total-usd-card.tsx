"use client";

import {
  circulatingSupplyHistoryQuery,
  genericMetricsQuery,
} from "@/queries/options";
import { formatCurrencyNumber } from "@/utils/number";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { type ComponentProps, useMemo } from "react";
import { GenericCard } from "./generic-card";

const Footer = () => {
  return (
    <>
      <div className="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </>
  );
};

export function TotalUSDCard({ ...rest }: ComponentProps<"div">) {
  const { data: circulatingSupplyHistory } = useQuery(
    circulatingSupplyHistoryQuery,
  );
  const { data: genericMetrics } = useQuery(genericMetricsQuery);

  const total = useMemo(() => {
    const circulatingSupplyPoint = circulatingSupplyHistory?.["0"];

    if (circulatingSupplyPoint && genericMetrics) {
      const [genericMetricPoint] = genericMetrics;

      return formatCurrencyNumber(
        genericMetricPoint.priceDYDX *
          Number.parseFloat(circulatingSupplyPoint.average_circulationsupply),
      );
    }
  }, [circulatingSupplyHistory, genericMetrics]);

  return (
    <GenericCard
      title="Total USD"
      description="It refers to the number of tokens that are purchased by dYdX foundation."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-4xl font-bold">{total}</h3>
        <p className="text-muted-foreground text-xs">USD</p>
      </div>
    </GenericCard>
  );
}
