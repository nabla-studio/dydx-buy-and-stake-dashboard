import { apiClient } from "./client";

interface GetStakingSupplyHistoryResponse {
  labels: string;
  stakingSupply: number;
  stakingApr: number;
  protocolRevenue: number;
  buybackFee: number;
  buybackFeeShare: number;
  historicUsers: number;
}

export const getStakingSupplyHistory = () =>
  apiClient
    .get<GetStakingSupplyHistoryResponse[]>("dydx/tokenomics/staking_supply")
    .json();

interface GetCirculatingSupplyHistoryResponse {
  average_circulationsupply: `${number}`;
  day: string;
}

export const getCirculatingSupplyHistory = () =>
  apiClient
    .get<Record<string, GetCirculatingSupplyHistoryResponse>>(
      "data/circulationsupply",
      {
        prefixUrl: "https://api.lacertalabs.xyz",
      },
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
