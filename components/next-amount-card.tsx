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

export function NextAmountCard({ ...rest }: ComponentProps<"div">) {
  return (
    <GenericCard
      title="Next Buyback Amount (DYDX)"
      description="Real-time DYDX estimate based on USDC in Buyback wallet."
      footer={<Footer />}
      {...rest}
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-foreground text-4xl font-bold">9999</h3>
        <p className="text-muted-foreground text-xs">DYDX</p>
      </div>
    </GenericCard>
  );
}
