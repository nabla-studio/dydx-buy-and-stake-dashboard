import {
  getCirculatingSupplyHistory,
  getGenericMetrics,
  getStakingSupplyHistory,
  getTotalWallets,
} from "@/services/numia";
import { thirtyDaysAgo, today } from "@/state/date-filter";
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

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD format
};

export const stakingSupplyHistoryQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    queryKey: ["staking-supply-history", startDate, endDate],
    queryFn: () => {
      return getStakingSupplyHistory({
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      });
    },
  });

export const genericMetricsQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    queryKey: ["generic-metrics", startDate, endDate],
    queryFn: () => {
      return getGenericMetrics({
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
      });
    },
  });

export const totalDydxBoughtBackQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...genericMetricsQuery(startDate, endDate),
    select(points) {
      const point = [...points].pop();

      return point ? formatCompactNumber(point.dydxAcquired) : undefined;
    },
  });

export const totalUsdBoughtBackQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...genericMetricsQuery(startDate, endDate),
    select(points) {
      const point = [...points].pop();

      return point
        ? formatCurrencyNumber(point.dydxAcquired * point.priceDYDX)
        : undefined;
    },
  });

export const dydxPriceQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...genericMetricsQuery(startDate, endDate),
    select(points) {
      const [firstPoint] = points;
      const lastPoint = [...points].pop();

      return {
        first:
          firstPoint?.priceDYDX !== undefined
            ? formatCurrencyNumber(firstPoint.priceDYDX)
            : undefined,
        last:
          lastPoint?.priceDYDX !== undefined
            ? formatCurrencyNumber(lastPoint.priceDYDX)
            : undefined,
      };
    },
  });

export const stakingSupplyQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...stakingSupplyHistoryQuery(startDate, endDate),
    select(points) {
      const point = [...points].pop();

      return point?.stakingSupply !== undefined
        ? formatCompactNumber(point.stakingSupply)
        : undefined;
    },
  });

export const stakingBalanceQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...genericMetricsQuery(startDate, endDate),
    select(points) {
      const [firstPoint] = points;
      const lastPoint = [...points].pop();

      return {
        first:
          firstPoint?.stakingBalance !== undefined
            ? formatCompactNumber(firstPoint.stakingBalance)
            : undefined,
        last:
          lastPoint?.stakingBalance !== undefined
            ? formatCompactNumber(lastPoint.stakingBalance)
            : undefined,
      };
    },
  });

export const stakingApyQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...stakingSupplyHistoryQuery(startDate, endDate),
    select(points) {
      const [firstPoint] = points;
      const lastPoint = [...points].pop();

      return {
        first:
          firstPoint?.stakingApr !== undefined
            ? formatPercentageNumber((firstPoint.stakingApr / 100) * 12)
            : undefined,
        last:
          lastPoint?.stakingApr !== undefined
            ? formatPercentageNumber((lastPoint.stakingApr / 100) * 12)
            : undefined,
      };
    },
  });

export const buybackFeeShareQuery = (startDate: Date, endDate: Date) =>
  queryOptions({
    ...stakingSupplyHistoryQuery(startDate, endDate),
    select(points) {
      const [firstPoint] = points;
      const lastPoint = [...points].pop();

      return {
        first:
          firstPoint?.buybackFeeShare !== undefined
            ? formatPercentageNumber(firstPoint.buybackFeeShare)
            : undefined,
        last:
          lastPoint?.buybackFeeShare !== undefined
            ? formatPercentageNumber(lastPoint.buybackFeeShare)
            : undefined,
      };
    },
  });

export const nextBuybackAmountQuery = queryOptions({
  ...genericMetricsQuery(thirtyDaysAgo, today),
  select(points) {
    const point = [...points].pop();

    return point?.priceDYDX !== undefined && point.liquidBalanceUSDC
      ? formatCompactNumber(point.liquidBalanceUSDC / point.priceDYDX)
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
