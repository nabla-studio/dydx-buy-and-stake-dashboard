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
    const point = [...points].pop();

    return point?.priceDYDX ? formatCurrencyNumber(point.priceDYDX) : undefined;
  },
});

export const stakingApyQuery = queryOptions({
  ...circulatingSupplyHistoryQuery,
  select(points) {
    const point = [...points].pop();

    return point?.stakingApr
      ? formatPercentageNumber(point.stakingApr * 12)
      : undefined;
  },
});

export const historicUsersQuery = queryOptions({
  ...circulatingSupplyHistoryQuery,
  select(points) {
    const point = [...points].pop();

    return point?.historicUsers
      ? formatCompactNumber(point.historicUsers)
      : undefined;
  },
});
