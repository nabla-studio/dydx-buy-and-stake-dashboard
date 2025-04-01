"use client";

import { stakingSupplyHistoryQuery } from "@/queries/options";
import { formatPercentageNumber } from "@/utils/number";
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

const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st of current year
const today = new Date();

export function PercentageFeesCard({ ...rest }: ComponentProps<"div">) {
  const { data } = useQuery({
    ...stakingSupplyHistoryQuery(startOfYear, today),
    select(data) {
      return formatPercentageNumber(
        data.map((el) => el.buybackFeeShare).reduce((p, c) => p + c, 0),
      );
    },
  });

  return (
    <GenericCard
      title="% of Fees Allocated to Buybacks"
      description="Share of protocol fees directed to the Buyback Program."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-4xl font-bold">{data}</h3>
      </div>
    </GenericCard>
  );
}
