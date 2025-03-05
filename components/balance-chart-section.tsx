"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { type ComponentProps, useMemo, useState } from "react";

const chartData = [
  { date: "2024-04-01", usd: 222, dydx: 150 },
  { date: "2024-04-02", usd: 97, dydx: 180 },
  { date: "2024-04-03", usd: 167, dydx: 120 },
  { date: "2024-04-04", usd: 242, dydx: 260 },
  { date: "2024-04-05", usd: 373, dydx: 290 },
  { date: "2024-04-06", usd: 301, dydx: 340 },
  { date: "2024-04-07", usd: 245, dydx: 180 },
  { date: "2024-04-08", usd: 409, dydx: 320 },
  { date: "2024-04-09", usd: 59, dydx: 110 },
  { date: "2024-04-10", usd: 261, dydx: 190 },
  { date: "2024-04-11", usd: 327, dydx: 350 },
  { date: "2024-04-12", usd: 292, dydx: 210 },
  { date: "2024-04-13", usd: 342, dydx: 380 },
  { date: "2024-04-14", usd: 137, dydx: 220 },
  { date: "2024-04-15", usd: 120, dydx: 170 },
  { date: "2024-04-16", usd: 138, dydx: 190 },
  { date: "2024-04-17", usd: 446, dydx: 360 },
  { date: "2024-04-18", usd: 364, dydx: 410 },
  { date: "2024-04-19", usd: 243, dydx: 180 },
  { date: "2024-04-20", usd: 89, dydx: 150 },
  { date: "2024-04-21", usd: 137, dydx: 200 },
  { date: "2024-04-22", usd: 224, dydx: 170 },
  { date: "2024-04-23", usd: 138, dydx: 230 },
  { date: "2024-04-24", usd: 387, dydx: 290 },
  { date: "2024-04-25", usd: 215, dydx: 250 },
  { date: "2024-04-26", usd: 75, dydx: 130 },
  { date: "2024-04-27", usd: 383, dydx: 420 },
  { date: "2024-04-28", usd: 122, dydx: 180 },
  { date: "2024-04-29", usd: 315, dydx: 240 },
  { date: "2024-04-30", usd: 454, dydx: 380 },
  { date: "2024-05-01", usd: 165, dydx: 220 },
  { date: "2024-05-02", usd: 293, dydx: 310 },
  { date: "2024-05-03", usd: 247, dydx: 190 },
  { date: "2024-05-04", usd: 385, dydx: 420 },
  { date: "2024-05-05", usd: 481, dydx: 390 },
  { date: "2024-05-06", usd: 498, dydx: 520 },
  { date: "2024-05-07", usd: 388, dydx: 300 },
  { date: "2024-05-08", usd: 149, dydx: 210 },
  { date: "2024-05-09", usd: 227, dydx: 180 },
  { date: "2024-05-10", usd: 293, dydx: 330 },
  { date: "2024-05-11", usd: 335, dydx: 270 },
  { date: "2024-05-12", usd: 197, dydx: 240 },
  { date: "2024-05-13", usd: 197, dydx: 160 },
  { date: "2024-05-14", usd: 448, dydx: 490 },
  { date: "2024-05-15", usd: 473, dydx: 380 },
  { date: "2024-05-16", usd: 338, dydx: 400 },
  { date: "2024-05-17", usd: 499, dydx: 420 },
  { date: "2024-05-18", usd: 315, dydx: 350 },
  { date: "2024-05-19", usd: 235, dydx: 180 },
  { date: "2024-05-20", usd: 177, dydx: 230 },
  { date: "2024-05-21", usd: 82, dydx: 140 },
  { date: "2024-05-22", usd: 81, dydx: 120 },
  { date: "2024-05-23", usd: 252, dydx: 290 },
  { date: "2024-05-24", usd: 294, dydx: 220 },
  { date: "2024-05-25", usd: 201, dydx: 250 },
  { date: "2024-05-26", usd: 213, dydx: 170 },
  { date: "2024-05-27", usd: 420, dydx: 460 },
  { date: "2024-05-28", usd: 233, dydx: 190 },
  { date: "2024-05-29", usd: 78, dydx: 130 },
  { date: "2024-05-30", usd: 340, dydx: 280 },
  { date: "2024-05-31", usd: 178, dydx: 230 },
  { date: "2024-06-01", usd: 178, dydx: 200 },
  { date: "2024-06-02", usd: 470, dydx: 410 },
  { date: "2024-06-03", usd: 103, dydx: 160 },
  { date: "2024-06-19", usd: 341, dydx: 290 },
  { date: "2024-06-20", usd: 408, dydx: 450 },
  { date: "2024-06-21", usd: 169, dydx: 210 },
  { date: "2024-06-22", usd: 317, dydx: 270 },
  { date: "2024-06-23", usd: 480, dydx: 530 },
  { date: "2024-06-24", usd: 132, dydx: 180 },
  { date: "2024-06-25", usd: 141, dydx: 190 },
  { date: "2024-06-26", usd: 434, dydx: 380 },
  { date: "2024-06-27", usd: 448, dydx: 490 },
  { date: "2024-06-28", usd: 149, dydx: 200 },
  { date: "2024-06-29", usd: 103, dydx: 160 },
  { date: "2024-06-30", usd: 446, dydx: 400 },
];

const chartConfig = {
  usd: {
    label: "USD",
    color: "hsl(var(--chart-1))",
  },
  dydx: {
    label: "DYDX",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BalanceChartSection({
  className,
  ...rest
}: ComponentProps<"div">) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("usd");

  const total = useMemo(
    () => ({
      usd: chartData.reduce((acc, curr) => acc + curr.usd, 0),
      dydx: chartData.reduce((acc, curr) => acc + curr.dydx, 0),
    }),
    [],
  );

  return (
    <Card className={cn("py-0", className)} {...rest}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Balance</CardTitle>
          <CardDescription>
            It refers to the number of tokens that are currently available
            inside dYdX foundation account.
          </CardDescription>
        </div>
        <div className="flex">
          {["usd", "dydx"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                type="button"
                data-active={activeChart === chart}
                className="flex flex-1 flex-col cursor-pointer justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total]}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
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
              minTickGap={32}
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
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
