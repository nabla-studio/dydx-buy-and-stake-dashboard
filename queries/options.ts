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

export const stakingSupplyHistoryQuery = queryOptions({
  queryKey: ["staking-supply-history", thirtyDaysAgo, today],
  queryFn: () => {
    return getStakingSupplyHistory({
      start_date: formatDate(thirtyDaysAgo),
      end_date: formatDate(today),
    });
  },
});

export const genericMetricsQuery = queryOptions({
  queryKey: ["generic-metrics"],
  queryFn: getGenericMetrics,
});

export const totalDydxBoughtBackQuery = queryOptions({
  ...genericMetricsQuery,
  select(points) {
    const [point] = points;

    return point ? formatCompactNumber(point.dydxAcquired) : undefined;
  },
});

export const totalUsdBoughtBackQuery = queryOptions({
  ...genericMetricsQuery,
  select(points) {
    const [point] = points;

    return point
      ? formatCurrencyNumber(point.dydxAcquired * point.priceDYDX)
      : undefined;
  },
});

export const dydxPriceQuery = queryOptions({
  ...genericMetricsQuery,
  select(points) {
    const [point] = points;

    return point?.priceDYDX !== undefined
      ? formatCurrencyNumber(point.priceDYDX)
      : undefined;
  },
});

export const stakingSupplyQuery = queryOptions({
  ...stakingSupplyHistoryQuery,
  select(points) {
    const [point] = points;

    return point?.stakingSupply !== undefined
      ? formatCompactNumber(point.stakingSupply)
      : undefined;
  },
});

export const stakingBalanceQuery = queryOptions({
  ...genericMetricsQuery,
  select(points) {
    const [point] = points;

    return point?.stakingBalance !== undefined
      ? formatCompactNumber(point.stakingBalance)
      : undefined;
  },
});

export const stakingApyQuery = queryOptions({
  ...stakingSupplyHistoryQuery,
  select(points) {
    const [point] = points;

    return point?.stakingApr !== undefined
      ? formatPercentageNumber((point.stakingApr / 100) * 12)
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
