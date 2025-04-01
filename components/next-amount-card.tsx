"use client";

import { nextBuybackAmountQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function NextAmountCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(nextBuybackAmountQuery);
  return (
    <GenericCard
      title="Next Buyback Amount (DYDX)"
      description="Real-time DYDX estimate based on USDC in Buyback wallet."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-xs">DYDX</p>
      </div>
    </GenericCard>
  );
}
