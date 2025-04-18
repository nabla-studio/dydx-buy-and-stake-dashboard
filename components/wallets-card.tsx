"use client";

import { useDateFilter } from "@/hooks/date-filter";
import { totalWalletsQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function WalletsCard({ ...rest }: ComponentProps<"div">) {
  const { notDefaultValue } = useDateFilter();
  const { data, isError } = useQuery(totalWalletsQuery);

  return (
    <GenericCard
      title="Wallets Holding DYDX"
      description="Number of wallets holding any DYDX balance."
      {...rest}
    >
      <div className="relative flex flex-col items-center gap-1 w-full">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>

        {notDefaultValue && !isError ? (
          <div className="absolute w-full inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            We can’t calculate for the selected range
          </div>
        ) : null}
        {isError ? (
          <div className="absolute inset-0 bg-background text-base flex items-center justify-center text-primary font-bold text-center">
            Something went wrong
          </div>
        ) : null}
      </div>
    </GenericCard>
  );
}
