"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { genericMetricsQuery } from "@/queries/options";
import { formatCompactNumber } from "@/utils/number";
import { useQuery } from "@tanstack/react-query";
import { type ComponentProps, useMemo, useState } from "react";
import { ChartLoader } from "./chart-loader";
import { Skeleton } from "./ui/skeleton";

const chartConfig = {
  liquidBalanceUSDC: {
    label: "USDC",
    color: "hsl(var(--chart-1))",
  },
  liquidBalanceDYDX: {
    label: "DYDX",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BalanceChartSection({
  className,
  ...rest
}: ComponentProps<"div">) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("liquidBalanceUSDC");

  const { data, isLoading } = useQuery(genericMetricsQuery);

  const { data: total } = useQuery({
    ...genericMetricsQuery,
    select(data) {
      return {
        liquidBalanceUSDC: data.reduce(
          (acc, curr) => acc + curr.liquidBalanceUSDC,
          0,
        ),
        liquidBalanceDYDX: data.reduce(
          (acc, curr) => acc + curr.liquidBalanceDYDX,
          0,
        ),
      };
    },
  });

  const minMax = useMemo(() => {
    if (!data?.length) return undefined;

    if (activeChart === "liquidBalanceDYDX") {
      const min = Math.min(...data.map((d) => d.liquidBalanceDYDX));
      const max = Math.max(...data.map((d) => d.liquidBalanceDYDX));

      return [min, max];
    }

    const min = Math.min(...data.map((d) => d.liquidBalanceUSDC));
    const max = Math.max(...data.map((d) => d.liquidBalanceUSDC));

    return [min, max];
  }, [activeChart, data]);

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
          {["liquidBalanceUSDC", "liquidBalanceDYDX"].map((key) => {
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
                {total ? (
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {formatCompactNumber(total[key as keyof typeof total])}
                  </span>
                ) : isLoading ? (
                  <Skeleton className="h-9 w-24 sm:h-[2.25rem] sm:w-32" />
                ) : null}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 relative">
        {isLoading ? <ChartLoader /> : null}
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
