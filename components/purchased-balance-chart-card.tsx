"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import type { ComponentProps } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { GenericCard } from "./generic-card";

const chartData = [
  { month: "January", amount: 10 },
  { month: "February", amount: 20 },
  { month: "March", amount: 30 },
  { month: "April", amount: 40 },
  { month: "May", amount: 50 },
  { month: "June", amount: 60 },
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer className="h-full w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}

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

export function PurchasedBalanceChartCard({ ...rest }: ComponentProps<"div">) {
  return (
    <GenericCard
      title="Cumulative Purchased"
      description="It refers to the number of tokens that are purchased by dYdX foundation."
      footer={<Footer />}
      {...rest}
    >
      <Chart />
    </GenericCard>
  );
}
