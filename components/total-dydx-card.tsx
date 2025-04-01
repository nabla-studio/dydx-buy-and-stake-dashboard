"use client";

import { totalDydxBoughtBackQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function TotalDydxCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(totalDydxBoughtBackQuery);

  return (
    <GenericCard
      title="Total Bought Back"
      description="Cumulative DYDX repurchased since program launch."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-sm">DYDX</p>
      </div>
    </GenericCard>
  );
}
