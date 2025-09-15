"use client";

import {
  buyBackWalletHistoryQuery,
  stakingWalletHistoryQuery,
} from "@/queries/options";
import { useInfiniteQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

export const TransactionsTable = () => {
  const [visibleCount, setVisibleCount] = useState(10);

  const {
    data: stakingWalletTxs,
    isLoading: stakingWalletIsLoading,
    hasNextPage: stakingWalletHasNextPage,
    fetchNextPage: stakingWalletFetchNextPage,
  } = useInfiniteQuery(stakingWalletHistoryQuery);
  const {
    data: buyBackWalletTxs,
    hasNextPage: buyBackWalletHasNextPage,
    isLoading: buyBackWalletIsLoading,
    fetchNextPage: buyBackWalletFetchNextPage,
  } = useInfiniteQuery(buyBackWalletHistoryQuery);

  const data = useMemo(
    () =>
      [...(stakingWalletTxs ?? []), ...(buyBackWalletTxs ?? [])]
        .filter((tx) => tx.code === 0)
        .sort((a, b) => compareDesc(a.datetime, b.datetime)),
    [buyBackWalletTxs, stakingWalletTxs],
  );

  const canLoadMore =
    stakingWalletHasNextPage ||
    buyBackWalletHasNextPage ||
    data.length > visibleCount;
  const isLoading = stakingWalletIsLoading || buyBackWalletIsLoading;

  const onLoadMore = useCallback(() => {
    if (stakingWalletHasNextPage) {
      stakingWalletFetchNextPage();
    }

    if (buyBackWalletHasNextPage) {
      buyBackWalletFetchNextPage();
    }

    setVisibleCount((prev) => Math.min(prev + 10, data.length));
  }, [
    data,
    stakingWalletHasNextPage,
    buyBackWalletHasNextPage,
    stakingWalletFetchNextPage,
    buyBackWalletFetchNextPage,
  ]);

  const visibleData = data.slice(0, Math.min(visibleCount, data.length));

  return (
    <DataTable
      className="md:col-span-full"
      columns={columns}
      data={visibleData ?? []}
      onLoadMore={onLoadMore}
      getRowHref={(row) => `https://mintscan.io/dydx/txs/${row.txHash}`}
      enableLoadMore={canLoadMore}
      isLoadingMore={isLoading}
    />
  );
};
