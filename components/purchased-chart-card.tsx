"use client";

import {
  genericMetricsQuery,
  stakingSupplyHistoryQuery,
} from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo } from "react";
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
  dydxAcquired: {
    label: "Buyback",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st of current year
const today = new Date();

const Chart = () => {
  const { data: dataGenericMetrics } = useQuery(
    genericMetricsQuery(startOfYear, today),
  );
  const { data: dataStakingSupply } = useQuery(
    stakingSupplyHistoryQuery(startOfYear, today),
  );

  const data = useMemo(
    () =>
      dataGenericMetrics?.map((genericMetric) => {
        const stakingSupply = dataStakingSupply?.find((data) => {
          const dataDate = new Date(data.labels);
          const metricDate = new Date(genericMetric.labels);
          return (
            dataDate.getFullYear() === metricDate.getFullYear() &&
            dataDate.getMonth() === metricDate.getMonth() &&
            dataDate.getDate() === metricDate.getDate()
          );
        });

        return {
          labels: genericMetric.labels,
          dydxAcquired: genericMetric.dydxAcquired,
          protocolRevenue: stakingSupply?.protocolRevenue ?? 0,
        };
      }) ?? [],
    [dataGenericMetrics, dataStakingSupply],
  );

  console.log(data);

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
          dataKey="dydxAcquired"
          type="monotone"
          stroke="var(--color-dydxAcquired)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export function PurchasedChartCard({ ...rest }: ComponentProps<"div">) {
  const { isLoading: isLoadingGenericMetrics } = useQuery(
    genericMetricsQuery(startOfYear, today),
  );
  const { isLoading: isLoadingStakingSupplyHistory } = useQuery(
    stakingSupplyHistoryQuery(startOfYear, today),
  );

  const isLoading = isLoadingGenericMetrics || isLoadingStakingSupplyHistory;

  return (
    <GenericCard
      title="Protocol Revenue vs Buybacks Over Time"
      description="Comparison of protocol revenue and buyback allocations."
      className="relative"
      {...rest}
    >
      {isLoading ? <ChartLoader /> : null}
      <Chart />
    </GenericCard>
  );
}
