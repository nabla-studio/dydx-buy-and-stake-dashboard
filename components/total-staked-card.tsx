"use client";

import { stakingSupplyQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function TotalStakedCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(stakingSupplyQuery);

  return (
    <GenericCard
      title="Total Staked"
      description="Total DYDX currently staked across the entire network."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-xs">DYDX</p>
      </div>
    </GenericCard>
  );
}
