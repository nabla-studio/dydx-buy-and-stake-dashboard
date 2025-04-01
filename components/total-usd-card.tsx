"use client";

import { totalUsdBoughtBackQuery } from "@/queries/options";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GenericCard } from "./generic-card";

export function TotalUSDCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(totalUsdBoughtBackQuery);

  return (
    <GenericCard
      title="Total USD Value of Buybacks"
      description="Aggregate value of all buybacks, converted in USD."
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-xs">USD</p>
      </div>
    </GenericCard>
  );
}
