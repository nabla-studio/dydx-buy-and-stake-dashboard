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
  buybackDeposit: number;
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

interface GetHistoryRequest {
  address: string;
  page: number;
  pageSize: number;
  messageTypes: string[];
}

export interface RawTransaction {
  _id: string;
  hash: string;
  chainId: string;
  schemaVersion: number;
  blockTimestamp: string;
  index: number;
  height: number;
  fee: Fee[];
  code: number;
  info: string;
  gasWanted: number;
  gasUsed: number;
  codespace: number;
  addressIndex: string[];
  messageTypes: string[];
  memo: string;
  messages: (MsgSend | MsgRecvPacket | MsgTransfer)[];
  ingested_at: string;
  metadata: string[];
  prices: number[];
}

export interface Fee {
  denom: string;
  amount: string;
}

export interface MsgSend {
  from_address: string;
  to_address: string;
  amount: Amount[];
  "@type": "/cosmos.bank.v1beta1.MsgSend";
}

export interface TimeoutHeight {
  revision_number: string;
  revision_height: string;
}

export interface Packet {
  sequence: string;
  source_port: string;
  source_channel: string;
  destination_port: string;
  destination_channel: string;
  data: {
    // base64
    data: string;
    memo: string;
    type: string;
  };
  timeout_height: TimeoutHeight;
  timeout_timestamp: string;
}

export interface MsgRecvPacket {
  packet: Packet;
  signer: string;
  proof_commitment: string;
  proof_height: TimeoutHeight;
  "@type": "/ibc.core.channel.v1.MsgRecvPacket";
}

export interface MsgTransfer {
  source_port: string;
  source_channel: string;
  token: Amount;
  sender: string;
  receiver: string;
  timeout_height: TimeoutHeight;
  timeout_timestamp: string;
  memo: string;
  "@type": "/ibc.applications.transfer.v1.MsgTransfer";
}

export interface Amount {
  denom: string;
  amount: string;
}

export const getHistory = (props: GetHistoryRequest) => {
  return apiClient
    .get<RawTransaction[]>(`dydx/v2/txs/${props.address}`, {
      searchParams: {
        messageTypes: props.messageTypes.join(","),
        page: props.page,
        pageSize: props.pageSize,
      },
    })
    .json();
};
