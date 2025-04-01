import { apiClient } from "./client";

interface GetCirculatingSupplyHistoryResponse {
  labels: string;
  stakingSupply: number;
  stakingApr: number;
  protocolRevenue: number;
  buybackFee: number;
  buybackFeeShare: number;
  historicUsers: number;
}

export const getCirculatingSupplyHistory = () =>
  apiClient
    .get<GetCirculatingSupplyHistoryResponse[]>(
      "dydx/tokenomics/staking_supply",
    )
    .json();

interface GetGenericMetricsResponse {
  labels: string;
  priceDYDX: number;
  dydxAcquired: number;
  stakingBalance: number;
  liquidBalanceDYDX: number;
  liquidBalanceUSDC: number;
  stakingRewardsUnclaimedDYDX: number;
  stakingRewardsUnclaimedUSDC: number;
  stakingRewardsClaimedDYDX: number;
  stakingRewardsClaimedUSDC: number;
}

export const getGenericMetrics = () =>
  apiClient
    .get<GetGenericMetricsResponse[]>(
      "dydx/tokenomics/buystake_address_metrics",
    )
    .json();
