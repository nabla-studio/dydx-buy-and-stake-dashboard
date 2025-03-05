import { BalanceChartSection } from "@/components/balance-chart-section";
import { CirculatingSupplySection } from "@/components/circulating-supply-section";
import { EarnUsdCard } from "@/components/earn-usd-card";
import { PurchasedBalanceChartCard } from "@/components/purchased-balance-chart-card";
import { PurchasedChartCard } from "@/components/purchased-chart-card";
import { PurchasedUsdCard } from "@/components/purchased-usd-card";
import { StakedChartCard } from "@/components/staked-chart-card";
import { StakedRadialChartCard } from "@/components/staked-radial-chart-card";
import { TransactionsTable } from "@/components/transactions-table";

export default function Home() {
  return (
    <section>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
        Dashboard
      </h1>

      <div className="grid gap-5 md:gap-8 md:grid-cols-3">
        <CirculatingSupplySection className="md:col-span-full" />

        <PurchasedChartCard />
        <PurchasedUsdCard />
        <PurchasedBalanceChartCard />

        <StakedChartCard />
        <StakedRadialChartCard />
        <EarnUsdCard />

        <BalanceChartSection className="md:col-span-full" />

        <TransactionsTable />
      </div>
    </section>
  );
}
