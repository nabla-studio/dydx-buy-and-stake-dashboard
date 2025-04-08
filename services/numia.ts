import { apiClient } from "./client";

interface Filters extends Record<string, string> {
  start_date: string;
  end_date: string;
}

interface GetStakingSupplyHistoryResponse {
  labels: string;
  stakingSupply: number;
  stakingApr: number;
  protocolRevenue: number;
  buybackFee: number;
  buybackFeeShare: number;
  historicUsers: number;
}

export const getStakingSupplyHistory = (payload: Filters) =>
  apiClient
    .get<GetStakingSupplyHistoryResponse[]>(
      "dydx/dydx/tokenomics/staking_supply",
      {
        searchParams: payload,
      },
    )
    .json()
    .then((data) => data.reverse());

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
    .json()
    .then((el) => Object.values(el).reverse());

interface GetTotalWalletsResponse {
  denom_owners: {
    address: string;
    balance: {
      denom: string;
      amount: `${number}`;
    };
  }[];
  pagination: {
    next_key: string;
    total: `${number}`;
  };
}

export const getTotalWallets = () =>
  apiClient
    .get<GetTotalWalletsResponse>(
      "dydx-lcd/cosmos/bank/v1beta1/denom_owners/adydx",
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

export const getGenericMetrics = (filters: Filters) =>
  apiClient
    .get<GetGenericMetricsResponse[]>(
      "dydx/dydx/tokenomics/buystake_address_metrics",
      {
        searchParams: filters,
      },
    )
    .json()
    .then((data) => data.reverse());
