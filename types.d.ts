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

interface Stat {
    name: string;
    value: string;
}

interface APIResponse {
    blockStats: Stat[];
    nodeStats: Stat[];
    nodeAccountStats: Stat[];
    systemStats: Stat[];
}
