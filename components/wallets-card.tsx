"use client";

import { totalWalletsQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function WalletsCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(totalWalletsQuery);

  return (
    <GenericCard
      title="Wallets Holding DYDX"
      description="Number of wallets holding any DYDX balance."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
      </div>
    </GenericCard>
  );
}
