"use client";

import type { ComponentProps } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { GenericCard } from "./generic-card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartData = [
  { date: new Date("2024-04-01").getTime(), desktop: 222, mobile: 150 },
  { date: new Date("2024-04-02").getTime(), desktop: 97, mobile: 180 },
  { date: new Date("2024-04-03").getTime(), desktop: 167, mobile: 120 },
  { date: new Date("2024-04-04").getTime(), desktop: 167, mobile: 120 },
  { date: new Date("2024-04-05").getTime(), desktop: 167, mobile: 120 },
  { date: new Date("2024-04-06").getTime(), desktop: 167, mobile: 120 },
  { date: new Date("2024-04-07").getTime(), desktop: 261, mobile: 190 },
  { date: new Date("2024-04-08").getTime(), desktop: 261, mobile: 190 },
  { date: new Date("2024-04-09").getTime(), desktop: 261, mobile: 190 },
  { date: new Date("2024-04-10").getTime(), desktop: 261, mobile: 190 },
  { date: new Date("2024-04-11").getTime(), desktop: 327, mobile: 350 },
  { date: new Date("2024-04-12").getTime(), desktop: 292, mobile: 210 },
  { date: new Date("2024-04-13").getTime(), desktop: 342, mobile: 380 },
];

const chartConfig = {
  views: {
    label: "DYDX",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Chart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
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
              labelFormatter={(_, payload) => {
                const [data] = payload;

                return new Date(data.payload.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
            />
          }
        />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export function StakedChartCard({ ...rest }: ComponentProps<"div">) {
  return (
    <GenericCard
      title="Staked"
      description="It refers to the number of tokens that are purchased by dYdX foundation."
      {...rest}
    >
      <Chart />
    </GenericCard>
  );
}
