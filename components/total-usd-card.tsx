"use client";

import { totalUsdBoughtBackQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

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

export function TotalUSDCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(totalUsdBoughtBackQuery);

  return (
    <GenericCard
      title="Total USD Value of Buybacks"
      description="Aggregate value of all buybacks, converted in USD."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-muted-foreground text-xs">USD</p>
      </div>
    </GenericCard>
  );
}
