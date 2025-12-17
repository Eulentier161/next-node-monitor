export type BlockCount = {
  count: string;
  cemented: string;
  unchecked: string;
};

export type TelemetryAvg = {
  block_count: string;
  cemented_count: string;
  unchecked_count: string;
  account_count: string;
  bandwidth_cap: string;
  peer_count: string;
  protocol_version: string;
  uptime: string;
  genesis_block: string;
  major_version: string;
  minor_version: string;
  patch_version: string;
  pre_release_version: string;
  maker: string;
  timestamp: string;
  active_difficulty: string;
};

export type Telemetry = TelemetryAvg & {
  node_id: string;
  signature: string;
};

export type Version = {
  rpc_version: string;
  store_version: string;
  protocol_version: string;
  node_vendor: string;
  store_vendor: string;
  network: string;
  network_identifier: string;
  build_info: string;
};

export type AccountInfo = {
  frontier: string;
  open_block: string;
  representative_block: string;
  balance: string;
  balance_decimal: string;
  modified_timestamp: string;
  block_count: string;
  account_version: string;
  confirmation_height: string;
  confirmation_height_frontier: string;
  representative: string;
  weight: string;
  weight_decimal: string;
  weight_decimal_millions: string;
  pending: string;
  pending_decimal: string;
  receivable: string;
  receivable_decimal: string;
};

export type Stats = {
  type: "counters";
  created: string;
  entries: {
    time: string;
    type: string;
    detail: string;
    dir: string;
    value: string;
  }[];
  stat_duration_seconds: string;
};

export type ConfirmationHistory = {
  confirmation_stats: { count: string; average: string };
  confirmations: Confirmation[];
};

export type Confirmation = {
  hash: string;
  duration: string;
  time: string;
  tally: string;
  blocks: string;
  voters: string;
  request_count: string;
};

export type ConfirmationInfo = {
  count: number;
  time_span: number;
  average: number;
  percentile50: number;
  percentile75: number;
  percentile90: number;
  percentile95: number;
  percentile99: number;
};
