import { rawToBan, sToTime } from '@helper/util';

export default function getDigestedApi(apiResponse: APIResponse) {
    const nodeStats = [
        { name: 'Version', value: apiResponse.version },
        { name: 'Database', value: apiResponse.store_vendor },
        { name: 'Node Uptime', value: sToTime(apiResponse.node_uptime) },
        { name: 'Peers', value: apiResponse.num_peers },
    ];

    const blockStats = [
        { name: 'Current Blocks', value: apiResponse.current_block.toLocaleString() },
        { name: 'Cemented Blocks', value: apiResponse.cemented_blocks.toLocaleString() },
        { name: 'Unchecked Blocks', value: apiResponse.unchecked_blocks.toLocaleString() },
        { name: 'Sync Status', value: `${apiResponse.block_sync}%` },
    ];

    const nodeAccountStats = [
        {
            name: 'Balance',
            value: `${rawToBan(apiResponse.acc_balance_raw).toLocaleString()} BAN`,
        },
        {
            name: 'Pending',
            value: `${rawToBan(apiResponse.acc_pending_raw).toLocaleString()} BAN`,
        },
        { name: 'Representative', value: apiResponse.rep_account },
        {
            name: 'Voting Weight',
            value: `${rawToBan(apiResponse.voting_weight_raw).toLocaleString()} BAN`,
        },
    ];

    const systemStats = [
        { name: 'Host', value: apiResponse.node_name },
        { name: 'Location', value: apiResponse.node_location },
        { name: 'Load', value: apiResponse.system_load },
        {
            name: 'Memory Used',
            value: `${Math.round(apiResponse.used_mem).toLocaleString()} / ${Math.round(
                apiResponse.total_mem
            ).toLocaleString()} MB`,
        },
    ];
    return { nodeStats, blockStats, nodeAccountStats, systemStats };
}
