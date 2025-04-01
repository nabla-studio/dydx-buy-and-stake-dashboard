import { AmountStakedCard } from "@/components/amount-staked-card";
import { ApyCard } from "@/components/apy-card";
import { CirculatingSupplySection } from "@/components/circulating-supply-section";
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
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Dashboard
      </h1>

      <div className="text-base text-muted-foreground mb-10">
        The <strong className="text-foreground">dYdX Buyback Program</strong>{" "}
        was launched by the{" "}
        <a
          className="text-primary"
          href="https://www.google.com/url?q=https://dydx.forum/t/drc-dydx-treasury-subdao-dydx-buyback-program/3433&sa=D&source=docs&ust=1743515327000781&usg=AOvVaw2bZCqQaUDax5-xa41_5N4B"
          target="_blank"
          rel="noreferrer"
        >
          dYdX Treasury SubDAO
        </a>{" "}
        to use protocol revenue for the purchase and staking of DYDX tokens.
        <br />
        The initiative aims to support sustainable token economics and long-term
        alignment with the dYdX community. The program operates through a series
        of on-chain proposals:
        <ul className="list-disc pl-10 py-4">
          <li>
            <a
              href="https://www.mintscan.io/dydx/proposals/225"
              target="_blank"
              rel="noreferrer"
              className="text-primary"
            >
              Proposal #225 - Initial Buyback Activation
            </a>
          </li>
          <li>
            <a
              href="https://www.mintscan.io/dydx/proposals/231"
              target="_blank"
              rel="noreferrer"
              className="text-primary"
            >
              Proposal #231 - dYdX Treasury SubDAO DYDX Buyback Program (Stage
              2)
            </a>
          </li>
        </ul>
        This dashboard provides real-time insights into buybacks, staking, and
        protocol revenue - empowering the community with transparent data.
      </div>

      <div className="grid gap-5 md:gap-8 md:grid-cols-3">
        <CirculatingSupplySection className="md:col-span-full" />

        <TotalDydxCard />
        <TotalUSDCard />
        <NextAmountCard />

        <div className="col-span-full">
          <p className="font-bold">Protocol data</p>
        </div>

        <PurchasedChartCard />
        <TotalFeesCard />
        <PercentageFeesCard />

        <div className="col-span-full">
          <p className="font-bold">Staking overview</p>
        </div>

        <TotalStakedCard />
        <AmountStakedCard />
        <ApyCard />

        <div className="col-span-full">
          <p className="font-bold">Network stats</p>
        </div>

        <PriceCard />
        <WalletsCard />
        <GrowthChartCard />
      </div>
    </section>
  );
}
