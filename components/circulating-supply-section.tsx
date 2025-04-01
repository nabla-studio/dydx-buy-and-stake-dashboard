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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { circulatingSupplyHistoryQuery } from "@/queries/options";
import { formatCompactNumber } from "@/utils/number";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { ChartLoader } from "./chart-loader";

const chartConfig = {
  views: {
    label: "DYDX",
  },
  average_circulationsupply: {
    label: "Circulating Supply",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CirculatingSupplySection({
  className,
  ...rest
}: ComponentProps<"div">) {
  const { data, isLoading } = useQuery(circulatingSupplyHistoryQuery);

  const { data: currentSupply } = useQuery({
    ...circulatingSupplyHistoryQuery,
    select(points) {
      const point = [...points].pop();

      return point?.average_circulationsupply;
    },
  });

  const { data: minMax } = useQuery({
    ...circulatingSupplyHistoryQuery,
    select(data) {
      if (!data?.length) return undefined;

      const min = Math.min(
        ...data.map((d) => Number.parseFloat(d.average_circulationsupply)),
      );
      const max = Math.max(
        ...data.map((d) => Number.parseFloat(d.average_circulationsupply)),
      );

      return [min, max];
    },
  });

  return (
    <Card className={cn("py-0", className)} {...rest}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Circulating Supply</CardTitle>
          <CardDescription>
            It refers to the number of tokens that are currently available in
            the market and can be freely traded.
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Current supply
            </span>
            {isLoading ? (
              <Skeleton className="h-9 w-24 sm:h-[2.25rem] sm:w-32" />
            ) : (
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {currentSupply ? formatCompactNumber(currentSupply) : null}
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative px-2 sm:p-6">
        {isLoading ? <ChartLoader /> : null}
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
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
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
              dataKey="average_circulationsupply"
              type="monotone"
              stroke="var(--color-average_circulationsupply)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
