"use client";

import { stakingApyQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function ApyCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(stakingApyQuery);

  return (
    <GenericCard
      title="Estimated APY"
      description="Projected yearly return on staked DYDX."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
      </div>
    </GenericCard>
  );
}
