import {
  type Amount,
  getCirculatingSupplyHistory,
  getGenericMetrics,
  getHistory,
  getStakingSupplyHistory,
  getTotalWallets,
} from "@/services/numia";
import { thirtyDaysAgo, today } from "@/state/date-filter";
import { extractData } from "@/utils/base64";
import {
  formatCompactNumber,
  formatCurrencyNumber,
  formatPercentageNumber,
} from "@/utils/number";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { assets } from "chain-registry/mainnet/dydx";

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

export type Transaction = {
  datetime: string;
  amount: string;
  type: "inflow" | "outflow";
  denom: string;
  sender: string;
  recipient: string;
};

const pageSize = 10;

export const historyQuery = (address: string) =>
  infiniteQueryOptions({
    queryKey: ["history", address],
    queryFn: ({ pageParam }) =>
      getHistory({
        address,
        page: pageParam,
        pageSize,
        messageTypes: [
          "/ibc.core.channel.v1.MsgRecvPacket",
          "/cosmos.bank.v1beta1.MsgSend",
        ],
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < pageSize) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    select(data) {
      const txs: Transaction[] = [];

      const rawTxs = data.pages.flat();

      for (const rawTx of rawTxs) {
        let txAmount: Amount;
        let fromAddress: string;
        let toAddress: string;

        const msg = rawTx.messages.find(
          (msg) =>
            msg["@type"] === "/cosmos.bank.v1beta1.MsgSend" ||
            msg["@type"] === "/ibc.core.channel.v1.MsgRecvPacket",
        );

        if (!msg) {
          continue;
        }

        if (msg["@type"] === "/ibc.core.channel.v1.MsgRecvPacket") {
          const extractedData = extractData(msg.packet.data.data);

          if (!extractedData) {
            continue;
          }

          txAmount = {
            denom: extractedData.denom,
            amount: extractedData.amount,
          };

          fromAddress = extractedData.fromAddress;
          toAddress = extractedData.toAddress;
        } else {
          const [sendTxAmount] = msg.amount;
          txAmount = sendTxAmount;
          fromAddress = msg.from_address;
          toAddress = msg.to_address;
        }

        const asset = assets.assets.find((a) => a.base === txAmount.denom);
        const unitDenom = asset?.denom_units.find(
          (unit) => unit.denom === asset.display,
        );

        if (!asset || !msg || !txAmount || !unitDenom) {
          continue;
        }

        const amount =
          BigInt(txAmount.amount) / BigInt(10 ** unitDenom.exponent);

        txs.push({
          datetime: rawTx.blockTimestamp,
          sender: fromAddress,
          recipient: toAddress,
          type: toAddress === address ? "inflow" : "outflow",
          amount: amount.toString(),
          denom: asset.display,
        });
      }

      return txs;
    },
  });

export const stakingWalletAddress =
  "dydx1vx93pwuxf7j5c90tukj084ka26fclcjuqdmw2a";
export const buyBackWalletAddress =
  "dydx1zc0jd76vfluauk6pc6rsq5dkwyjz9h8uqgppj6";

export const stakingWalletHistoryQuery = historyQuery(stakingWalletAddress);
export const buyBackWalletHistoryQuery = historyQuery(buyBackWalletAddress);
