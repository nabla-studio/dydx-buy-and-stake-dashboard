"use client";

import {
  buyBackWalletHistoryQuery,
  stakingWalletHistoryQuery,
} from "@/queries/options";
import { useInfiniteQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { useCallback, useMemo } from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

export const TransactionsTable = () => {
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
      [...(stakingWalletTxs ?? []), ...(buyBackWalletTxs ?? [])].sort((a, b) =>
        compareDesc(a.datetime, b.datetime),
      ),
    [buyBackWalletTxs, stakingWalletTxs],
  );

  const hasNextPage = stakingWalletHasNextPage || buyBackWalletHasNextPage;
  const isLoading = stakingWalletIsLoading || buyBackWalletIsLoading;

  const onLoadMore = useCallback(() => {
    if (stakingWalletHasNextPage) {
      stakingWalletFetchNextPage();
    }

    if (buyBackWalletHasNextPage) {
      buyBackWalletFetchNextPage();
    }
  }, [
    stakingWalletHasNextPage,
    buyBackWalletHasNextPage,
    stakingWalletFetchNextPage,
    buyBackWalletFetchNextPage,
  ]);

  return (
    <DataTable
      className="md:col-span-full"
      columns={columns}
      data={data ?? []}
      onLoadMore={onLoadMore}
      getRowHref={(row) => `https://mintscan.io/dydx/txs/${row.txHash}`}
      enableLoadMore={hasNextPage}
      isLoadingMore={isLoading}
    />
  );
};
