import { rawToBan, sToTime } from '@helper/util';

export default function getDigestedApi(apiResponse: APIResponse | undefined) {
    const loading = 'loading...';

    const nodeStats = [
        { name: 'Version', value: apiResponse ? apiResponse.version : loading },
        { name: 'Database', value: apiResponse ? apiResponse.store_vendor : loading },
        { name: 'Node Uptime', value: apiResponse ? sToTime(apiResponse.node_uptime) : loading },
        { name: 'Peers', value: apiResponse ? apiResponse.num_peers : loading },
    ];

    const blockStats = [
        { name: 'Current Blocks', value: apiResponse ? apiResponse.current_block.toLocaleString() : loading },
        { name: 'Cemented Blocks', value: apiResponse ? apiResponse.cemented_blocks.toLocaleString() : loading },
        { name: 'Unchecked Blocks', value: apiResponse ? apiResponse.unchecked_blocks.toLocaleString() : loading },
        { name: 'Sync Status', value: apiResponse ? `${apiResponse.block_sync}%` : loading },
    ];

    const nodeAccountStats = [
        {
            name: 'Balance',
            value: apiResponse ? `${rawToBan(apiResponse.acc_balance_raw).toLocaleString()} BAN` : loading,
        },
        {
            name: 'Pending',
            value: apiResponse ? `${rawToBan(apiResponse.acc_pending_raw).toLocaleString()} BAN` : loading,
        },
        { name: 'Representative', value: apiResponse ? apiResponse.rep_account : loading },
        {
            name: 'Voting Weight',
            value: apiResponse ? `${rawToBan(apiResponse.voting_weight_raw).toLocaleString()} BAN` : loading,
        },
    ];

    const systemStats = [
        { name: 'Host', value: apiResponse ? apiResponse.node_name : loading },
        { name: 'Location', value: apiResponse ? apiResponse.node_location : loading },
        { name: 'Load', value: apiResponse ? apiResponse.system_load : loading },
        {
            name: 'Memory Used',
            value: apiResponse
                ? `${Math.round(apiResponse.used_mem).toLocaleString()} / ${Math.round(
                      apiResponse.total_mem
                  ).toLocaleString()} MB`
                : loading,
        },
    ];
    return { nodeStats, blockStats, nodeAccountStats, systemStats };
}
