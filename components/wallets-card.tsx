"use client";

import { totalWalletsQuery } from "@/queries/options";
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

export function WalletsCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery(totalWalletsQuery);

  return (
    <GenericCard
      title="Wallets Holding DYDX"
      description="Number of wallets holding any DYDX balance."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-7xl font-bold">{data}</h3>
      </div>
    </GenericCard>
  );
}
