import { apiClient } from "./client";

interface GetCirculatingSupplyHistoryResponse {
  timestamp: string;
  circulatingSupply: number;
}

export const getCirculatingSupplyHistory = () =>
  apiClient.get<GetCirculatingSupplyHistoryResponse[]>("circulating");

interface GetGenericMetricsResponse {
  timestamp: string;
  dydxAcquired: number;
  stakingBalance: number;
  liquidBalanceDYDX: number;
  liquidBalanceUSDC: number;
  stakingRewardsUnclaimed: number;
  stakingRewardsClaimed: number;
}

export const getGenericMetrics = () =>
  apiClient.get<GetGenericMetricsResponse[]>("generic-metrics");
