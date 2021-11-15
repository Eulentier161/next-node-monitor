interface Telemetry {
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
    node_id: string;
    signature: string;
}

interface Version {
    rpc_version: string;
    store_version: string;
    protocol_version: string;
    node_vendor: string;
    store_vendor: string;
    network: string;
    network_identifier: string;
    build_info: string;
}

interface AccountInfo {
    frontier: string;
    open_block: string;
    representative_block: string;
    balance: string;
    modified_timestamp: string;
    block_count: string;
    account_version: string;
    confirmation_height: string;
    confirmation_height_frontier: string;
    representative: string;
    weight: string;
    pending: string;
}

interface StatsCountersEntry {
    time: string;
    type: string;
    detail: string;
    dir: string;
    value: string;
}

interface StatsCounters {
    type: string;
    created: string;
    entries: StatsCountersEntry[];
    stat_duration_seconds: string;
}

interface ConfirmationStats {
    count: string;
    average: string;
}

interface Confirmation {
    hash: string;
    duration: string;
    time: string;
    tally: string;
    blocks: string;
    voters: string;
    request_count: string;
}

interface ConfirmationHistory {
    confirmation_stats: ConfirmationStats;
    confirmations: Confirmation[];
}

interface SystemInfo {
    systemLoad: number;
    totalMem: number;
    usedMem: number;
}

interface ConfirmationInfo {
    count: number;
    time_span: number;
    average: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    percentile95: number;
    percentile99: number;
}

interface RPCResponse {
    telemetry: Telemetry;
    version: Version;
    accountInfo: AccountInfo;
    systemInfo: SystemInfo;
    stats: StatsCounters;
    telemetryAvg: TelemetryAverage;
    confirmationInfo: ConfirmationInfo;
}

interface APIResponse {
    node_account: string;
    version: string;
    store_version: number;
    protocol_version: number;
    store_vendor: string;
    current_block: number;
    unchecked_blocks: number;
    cemented_blocks: number;
    num_peers: number;
    confirmation_info: ConfirmationInfo;
    acc_balance_raw: number;
    acc_pending_raw: number;
    rep_account: string;
    voting_weight_raw: number;
    system_load: number;
    used_mem: number;
    total_mem: number;
    node_name: string;
    node_uptime: number;
    node_location: string;
    stats: StatsCounters;
    telemetry_avg: Telemetry;
    block_sync: number;
}
