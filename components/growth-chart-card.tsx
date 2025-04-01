"use client";

import { stakingSupplyHistoryQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
  historicUsers: {
    label: "Wallets",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart = () => {
  const { data } = useQuery({
    ...stakingSupplyHistoryQuery,
    select(data) {
      return data.reverse();
    },
  });

  const minMax = useMemo(() => {
    if (!data?.length) return undefined;

    const min = Math.min(...data.map((d) => d.historicUsers));
    const max = Math.max(...data.map((d) => d.historicUsers));

    return [min, max];
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 12,
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
        <YAxis tickLine={false} axisLine={false} hide domain={minMax} />
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
          dataKey="historicUsers"
          type="monotone"
          stroke="var(--color-historicUsers)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export function GrowthChartCard({ ...rest }: ComponentProps<"div">) {
  const { isLoading } = useQuery(stakingSupplyHistoryQuery);

  return (
    <GenericCard
      title="Wallet Growth Over Time"
      description="Historical growth in the number of DYDX-holding wallets."
      className="relative"
      {...rest}
    >
      {isLoading ? <ChartLoader /> : null}
      <Chart />
    </GenericCard>
  );
}
