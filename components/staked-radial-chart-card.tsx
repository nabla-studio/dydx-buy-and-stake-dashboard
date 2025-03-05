"use client";

import type { ComponentProps } from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { GenericCard } from "./generic-card";
import { type ChartConfig, ChartContainer } from "./ui/chart";

const chartData = [
  { type: "staked", amount: 275, fill: "var(--color-staked)" },
];

const chartConfig = {
  staked: {
    label: "Staked",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[250px] h-full mx-auto"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={250}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="amount" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {chartData[0].amount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      DYDX
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};

export function StakedRadialChartCard({ ...rest }: ComponentProps<"div">) {
  return (
    <GenericCard
      title="Staked"
      description="It refers to the number of tokens that are staked by dYdX foundation."
      {...rest}
    >
      <Chart />
    </GenericCard>
  );
}
