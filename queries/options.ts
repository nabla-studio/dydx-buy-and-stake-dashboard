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

export const totalDydxBoughtBackQuery = queryOptions({
  ...genericMetricsQuery(thirtyDaysAgo, today),
  select(points) {
    const point = [...points].pop();

    return point ? formatCompactNumber(point.dydxAcquired) : undefined;
  },
});

export const totalUsdBoughtBackQuery = queryOptions({
  ...genericMetricsQuery(thirtyDaysAgo, today),
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
      const lastPpoint = [...points].pop();

      return {
        first:
          firstPoint?.priceDYDX !== undefined
            ? formatCurrencyNumber(firstPoint.priceDYDX)
            : undefined,
        last:
          lastPpoint?.priceDYDX !== undefined
            ? formatCurrencyNumber(lastPpoint.priceDYDX)
            : undefined,
      };
    },
  });

export const stakingSupplyQuery = queryOptions({
  ...stakingSupplyHistoryQuery(thirtyDaysAgo, today),
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

export const stakingApyQuery = queryOptions({
  ...stakingSupplyHistoryQuery(thirtyDaysAgo, today),
  select(points) {
    const point = [...points].pop();

    return point?.stakingApr !== undefined
      ? formatPercentageNumber((point.stakingApr / 100) * 12)
      : undefined;
  },
});

export const buybackFeeShareQuery = queryOptions({
  ...stakingSupplyHistoryQuery(thirtyDaysAgo, today),
  select(points) {
    const point = [...points].pop();

    return point?.buybackFeeShare !== undefined
      ? formatPercentageNumber(point.buybackFeeShare)
      : undefined;
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
