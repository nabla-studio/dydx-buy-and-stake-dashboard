import { AmountStakedCard } from "@/components/amount-staked-card";
import { ApyCard } from "@/components/apy-card";
import { DatePickerWithRange } from "@/components/global-date-filter";
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
    <section className="pt-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>

        <DatePickerWithRange />
      </div>

      <div className="text-base text-muted-foreground mb-20">
        The <strong className="text-foreground">dYdX Buyback Program</strong>,
        launched by the{" "}
        <a
          className="text-primary"
          href="https://www.google.com/url?q=https://dydx.forum/t/drc-dydx-treasury-subdao-dydx-buyback-program/3433&sa=D&source=docs&ust=1743515327000781&usg=AOvVaw2bZCqQaUDax5-xa41_5N4B"
          target="_blank"
          rel="noreferrer"
        >
          dYdX Treasury SubDAO
        </a>
        , leverages protocol revenue to purchase and stake DYDX tokens,
        promoting sustainable token economics and long-term community alignment.
        Activated through a series of on-chain proposals, including{" "}
        <a
          href="https://www.mintscan.io/dydx/proposals/225"
          target="_blank"
          rel="noreferrer"
          className="text-primary"
        >
          Proposal #225
        </a>{" "}
        (Initial Buyback Activation){" "}
        <a
          href="https://www.mintscan.io/dydx/proposals/231"
          target="_blank"
          rel="noreferrer"
          className="text-primary"
        >
          Proposal #231
        </a>{" "}
        (Stage 2 of the Buyback Program), the initiative reflects a data-driven,
        transparent approach to treasury management.
      </div>

      <div className="grid gap-5 md:gap-8 md:grid-cols-3">
        {/* <CirculatingSupplySection className="md:col-span-full" /> */}

        <TotalDydxCard />
        <TotalUSDCard />
        <NextAmountCard />

        <div className="col-span-full">
          <p className="font-bold uppercase text-xs text-muted-foreground">
            Protocol data
          </p>
        </div>

        <PurchasedChartCard />
        <TotalFeesCard />
        <PercentageFeesCard />

        <div className="col-span-full">
          <p className="font-bold uppercase text-xs text-muted-foreground">
            Staking overview
          </p>
        </div>

        <TotalStakedCard />
        <AmountStakedCard />
        <ApyCard />

        <div className="col-span-full">
          <p className="font-bold uppercase text-xs text-muted-foreground">
            Network stats
          </p>
        </div>

        <PriceCard />
        <WalletsCard />
        <GrowthChartCard />
      </div>
    </section>
  );
}
