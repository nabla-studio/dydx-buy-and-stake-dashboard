import {
  getCirculatingSupplyHistory,
  getGenericMetrics,
  getStakingSupplyHistory,
  getTotalWallets,
} from "@/services/numia";
import {
  formatCompactNumber,
  formatCurrencyNumber,
  formatPercentageNumber,
} from "@/utils/number";
import { queryOptions } from "@tanstack/react-query";

export const circulatingSupplyHistoryQuery = queryOptions({
  queryKey: ["circulating-supply-history"],
  queryFn: getCirculatingSupplyHistory,
});

const today = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

export const stakingSupplyHistoryQuery = (
  startDate = thirtyDaysAgo,
  endDate = today,
) =>
  queryOptions({
    queryKey: ["staking-supply-history", startDate, endDate],
    queryFn: () => {
      return getStakingSupplyHistory({
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      });
    },
  });

export const genericMetricsQuery = (
  startDate = thirtyDaysAgo,
  endDate = today,
) =>
  queryOptions({
    queryKey: ["generic-metrics"],
    queryFn: () => {
      return getGenericMetrics({
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      });
    },
  });

export const totalDydxBoughtBackQuery = queryOptions({
  ...genericMetricsQuery(),
  select(points) {
    const point = [...points].pop();

    return point ? formatCompactNumber(point.dydxAcquired) : undefined;
  },
});

export const totalUsdBoughtBackQuery = queryOptions({
  ...genericMetricsQuery(),
  select(points) {
    const point = [...points].pop();

    return point
      ? formatCurrencyNumber(point.dydxAcquired * point.priceDYDX)
      : undefined;
  },
});

export const dydxPriceQuery = queryOptions({
  ...genericMetricsQuery(),
  select(points) {
    const point = [...points].pop();

    return point?.priceDYDX !== undefined
      ? formatCurrencyNumber(point.priceDYDX)
      : undefined;
  },
});

export const stakingSupplyQuery = queryOptions({
  ...stakingSupplyHistoryQuery(),
  select(points) {
    const point = [...points].pop();

    return point?.stakingSupply !== undefined
      ? formatCompactNumber(point.stakingSupply)
      : undefined;
  },
});

export const stakingBalanceQuery = queryOptions({
  ...genericMetricsQuery(),
  select(points) {
    const point = [...points].pop();

    return point?.stakingBalance !== undefined
      ? formatCompactNumber(point.stakingBalance)
      : undefined;
  },
});

export const stakingApyQuery = queryOptions({
  ...stakingSupplyHistoryQuery(),
  select(points) {
    const point = [...points].pop();

    return point?.stakingApr !== undefined
      ? formatPercentageNumber((point.stakingApr / 100) * 12)
      : undefined;
  },
});

export const buybackFeeShareQuery = queryOptions({
  ...stakingSupplyHistoryQuery(),
  select(points) {
    const point = [...points].pop();

    return point?.buybackFeeShare !== undefined
      ? formatPercentageNumber(point.buybackFeeShare)
      : undefined;
  },
});

export const totalWalletsQuery = queryOptions({
  queryKey: ["total-wallets"],
  queryFn: getTotalWallets,
  select(data) {
    return formatCompactNumber(data.pagination.total);
  },
});
