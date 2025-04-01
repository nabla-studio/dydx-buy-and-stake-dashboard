import {
  getCirculatingSupplyHistory,
  getGenericMetrics,
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

export const genericMetricsQuery = queryOptions({
  queryKey: ["generic-metrics"],
  queryFn: getGenericMetrics,
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
  ...circulatingSupplyHistoryQuery,
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
  ...circulatingSupplyHistoryQuery,
  select(points) {
    const [point] = points;

    return point?.stakingApr !== undefined
      ? formatPercentageNumber((point.stakingApr / 100) * 12)
      : undefined;
  },
});

export const historicUsersQuery = queryOptions({
  ...circulatingSupplyHistoryQuery,
  select(points) {
    const [point] = points;

    return point?.historicUsers !== undefined
      ? formatCompactNumber(point.historicUsers)
      : undefined;
  },
});
