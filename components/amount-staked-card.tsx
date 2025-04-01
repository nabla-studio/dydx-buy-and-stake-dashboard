"use client";

import { stakingBalanceQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function AmountStakedCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(stakingBalanceQuery);

  return (
    <GenericCard
      title="DYDX Staked via Buyback Program"
      description="DYDX staked through Treasury SubDAO buybacks."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-xs">DYDX</p>
      </div>
    </GenericCard>
  );
}
