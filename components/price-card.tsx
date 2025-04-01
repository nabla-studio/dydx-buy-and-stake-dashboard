"use client";

import { dydxPriceQuery } from "@/queries/options";
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
    </>
  );
};

export function PriceCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(dydxPriceQuery);

  return (
    <GenericCard
      title="DYDX Price"
      description="Live market price of DYDX."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
        <p className="text-primary text-xs">USD</p>
      </div>
    </GenericCard>
  );
}
