"use client";

import { useDateFilter } from "@/hooks/date-filter";
import {
  genericMetricsQuery,
  stakingSupplyHistoryQuery,
} from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartLoader } from "./chart-loader";
import { GenericCard } from "./generic-card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  views: {
    label: "DYDX",
  },
  protocolRevenue: {
    label: "Protocol Revenue",
    color: "hsl(var(--chart-1))",
  },
  buybackFee: {
    label: "Buyback",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Chart = () => {
  const { dates } = useDateFilter();
  const { data, isError, isLoading } = useQuery(
    stakingSupplyHistoryQuery(dates.from, dates.to),
  );

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <div className="bg-background text-base flex items-center justify-center text-primary font-bold text-center">
        Something went wrong
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <h3 className="text-foreground text-7xl font-bold">N/A</h3>;
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto relative h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="labels"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={16}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[200px]"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
          }
        />
        <Line
          dataKey="protocolRevenue"
          type="monotone"
          stroke="var(--color-protocolRevenue)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          dataKey="buybackFee"
          type="monotone"
          stroke="var(--color-buybackFee)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export function PurchasedChartCard({ ...rest }: ComponentProps<"div">) {
  const { dates } = useDateFilter();

  const { isLoading: isLoadingGenericMetrics } = useQuery(
    genericMetricsQuery(dates.from, dates.to),
  );
  const { isLoading: isLoadingStakingSupplyHistory } = useQuery(
    stakingSupplyHistoryQuery(dates.from, dates.to),
  );

  const isLoading = isLoadingGenericMetrics || isLoadingStakingSupplyHistory;

  return (
    <GenericCard
      title="Protocol Net Fees & DYDX Buybacks"
      description="Comparison of protocol revenue and buyback allocations."
      className="relative"
      {...rest}
    >
      {isLoading ? <ChartLoader /> : null}
      <Chart />
    </GenericCard>
  );
}
