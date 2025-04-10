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
import { TransactionsTable } from "@/components/transactions-table";
import { WalletsCard } from "@/components/wallets-card";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="pt-15">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-[90px]">
        <h1 className="font-extrabold text-center lg:text-left leading-tight text-5xl lg:text-[84px]">
          DYDX Buyback
          <br />
          Program
        </h1>

        <img
          className="w-full lg:max-w-1/2 pt-15"
          src="/coins.png"
          alt="Coins"
        />
      </div>

      <div className="flex items-center justify-between mb-8 gap-2">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          dYdX Buyback Tracker: Powered by the Community
        </h2>

        <Suspense>
          <DatePickerWithRange />
        </Suspense>
      </div>

      <div className="text-base text-muted-foreground mb-10">
        The <strong>dYdX Buyback Program</strong>,{" "}
        <a
          className="text-primary"
          href="https://dydx.forum/t/drc-dydx-treasury-subdao-dydx-buyback-program/3433"
          target="_blank"
          rel="noreferrer"
        >
          launched by the Treasury SubDAO
        </a>{" "}
        and approved through community governance (Proposals{" "}
        <a
          className="text-primary"
          href="https://www.mintscan.io/dydx/proposals/225"
          target="_blank"
          rel="noreferrer"
        >
          #225
        </a>{" "}
        and{" "}
        <a
          className="text-primary"
          href="https://www.mintscan.io/dydx/proposals/231"
          target="_blank"
          rel="noreferrer"
        >
          #231
        </a>
        ), allocates 25% of net protocol fees to monthly purchases of DYDX on
        the open market, with the acquired tokens then staked to support the
        network. This initiative reinforces long-term confidence in the token,
        promotes sustainable token economics, and strengthens network security.
        <br />
        <br />
        This dashboard was created by the community to provide ongoing
        transparency into the buyback program and a broader view of the dYdX
        ecosystem. If you’d like to buy DYDX tokens, check out this{" "}
        <a
          className="text-primary"
          href="https://www.dydx.xyz/crypto-learning/how-to-purchase-dydx"
          target="_blank"
          rel="noreferrer"
        >
          guide to learn how
        </a>
        .
      </div>

      <div className="grid gap-5 md:gap-8 md:grid-cols-3">
        {/* <CirculatingSupplySection className="md:col-span-full" /> */}

        <Suspense>
          <TotalDydxCard />
        </Suspense>
        <Suspense>
          <TotalUSDCard />
        </Suspense>
        <Suspense>
          <NextAmountCard />
        </Suspense>

        <div className="col-span-full pt-2.5">
          <p className="font-bold uppercase text-xs text-muted-foreground mb-5">
            Tracking the Growth of the dYdX Ecosystem
          </p>

          <div className="text-sm text-muted-foreground">
            The impact of the dYdX Buyback Program is fundamentally tied to the
            growth of the broader ecosystem. Below, you&apos;ll find real-time
            data offering transparency across key metrics.
            <ul className="list-disc pl-10 py-4">
              <li>
                Protocol fees reflect trading activity on the platform,
                indicating overall usage and volume.
              </li>
              <li>
                Staking data provides insight into network security and the
                amount of DYDX committed to the chain.
              </li>
              <li>
                Wallet holder growth serves as a proxy for ecosystem expansion,
                highlighting how the community of DYDX token holders is evolving
                over time.
              </li>
            </ul>
            These metrics together help paint a clear picture of how the buyback
            program supports and scales with the dYdX ecosystem. Join the
            conversation and help shape the future of dYdX by sharing feedback
            on{" "}
            <a
              href="https://discord.com/invite/dydx"
              className="text-sm text-primary"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>{" "}
            or participating in the community{" "}
            <a
              href="https://dydx.forum"
              target="_blank"
              className="text-sm text-primary"
              rel="noreferrer"
            >
              Forum
            </a>
            .
          </div>
        </div>

        <Suspense>
          <PurchasedChartCard />
        </Suspense>
        <Suspense>
          <TotalFeesCard />
        </Suspense>
        <PercentageFeesCard />

        <div className="col-span-full pt-2.5">
          <p className="font-bold uppercase text-xs text-muted-foreground">
            Staking overview
          </p>
        </div>

        <Suspense>
          <TotalStakedCard />
        </Suspense>
        <Suspense>
          <AmountStakedCard />
        </Suspense>
        <Suspense>
          <ApyCard />
        </Suspense>

        <div className="col-span-full pt-2.5">
          <p className="font-bold uppercase text-xs text-muted-foreground">
            Network stats
          </p>
        </div>

        <Suspense>
          <PriceCard />
        </Suspense>
        <Suspense>
          <WalletsCard />
        </Suspense>
        <Suspense>
          <GrowthChartCard />
        </Suspense>

        <TransactionsTable />
      </div>
    </section>
  );
}
