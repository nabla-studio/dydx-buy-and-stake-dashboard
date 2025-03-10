"use client";

import { genericMetricsQuery } from "@/queries/options";
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
  stakingBalance: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart = () => {
  const { data } = useQuery(genericMetricsQuery);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
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
          dataKey="timestamp"
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
              className="w-[150px]"
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
          dataKey="stakingBalance"
          type="monotone"
          stroke="var(--color-stakingBalance)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export function StakedChartCard({ ...rest }: ComponentProps<"div">) {
  const { isLoading } = useQuery(genericMetricsQuery);

  return (
    <GenericCard
      title="Staked"
      description="It refers to the number of tokens that are purchased by dYdX foundation."
      className="relative"
      {...rest}
    >
      {isLoading ? <ChartLoader /> : null}
      <Chart />
    </GenericCard>
  );
}
