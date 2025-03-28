import { AmountStakedCard } from "@/components/amount-staked-card";
import { ApyCard } from "@/components/apy-card";
import { GrowthChartCard } from "@/components/growth-chart-card";
import { NextAmountCard } from "@/components/next-amount-card";
import { PercentageFeesCard } from "@/components/percentage-fees-card";
import { PriceCard } from "@/components/price-card";
import { PurchasedChartCard } from "@/components/purchased-chart-card";
import { TotalDydxCard } from "@/components/total-dydx-card";
import { TotalFeesCard } from "@/components/total-fees-card";
import { TotalStakedCard } from "@/components/total-staked-card";
import { TotalUSDCard } from "@/components/total-usd-card";
import { WalletsCard } from "@/components/wallets-card";

export default function Home() {
  return (
    <section>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Dashboard
      </h1>

      <p className="mb-10">Lorem ipsum</p>

      <div className="grid gap-5 md:gap-8 md:grid-cols-3">
        <TotalDydxCard />
        <TotalUSDCard />
        <NextAmountCard />

        <div className="col-span-full">
          <p>Lorem ipsum</p>
        </div>

        <PurchasedChartCard />
        <TotalFeesCard />
        <PercentageFeesCard />

        <TotalStakedCard />
        <AmountStakedCard />
        <ApyCard />

        <PriceCard />
        <WalletsCard />
        <GrowthChartCard />
      </div>
    </section>
  );
}
