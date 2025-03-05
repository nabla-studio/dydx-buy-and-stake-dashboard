"use client";

import type { ComponentProps } from "react";
import { Pie, PieChart } from "recharts";
import { GenericCard } from "./generic-card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartData = [
  { type: "staked", amount: 275, fill: "var(--color-staked)" },
  { type: "circulating", amount: 200, fill: "var(--color-circulating)" },
];

const chartConfig = {
  staked: {
    label: "Staked",
    color: "hsl(var(--chart-1))",
  },
  circulating: {
    label: "Circulating",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Chart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <PieChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <Pie data={chartData} dataKey="amount" nameKey="type" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </PieChart>
    </ChartContainer>
  );
};

export function StakedPieChartCard({ ...rest }: ComponentProps<"div">) {
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
