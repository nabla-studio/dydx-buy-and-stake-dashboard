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

      <div className="text-base mb-10">
        The <strong>dYdX Buyback Program</strong> was launched by the{" "}
        <a
          className="underline"
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
              className="underline"
            >
              Proposal #225 - Initial Buyback Activation
            </a>
          </li>
          <li>
            <a
              href="https://www.mintscan.io/dydx/proposals/231"
              target="_blank"
              rel="noreferrer"
              className="underline"
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
