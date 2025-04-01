"use client";

import { totalDydxBoughtBackQuery } from "@/queries/options";
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

export function TotalDydxCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(totalDydxBoughtBackQuery);

  return (
    <GenericCard
      title="Total DYDX"
      description="It refers to the number of tokens that are purchased by dYdX foundation."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-4xl font-bold">{data}</h3>
      </div>
    </GenericCard>
  );
}
