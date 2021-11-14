import { rawToBan, sToTime } from '@helper/util';

export default function getDigestedApi(apiResponse: APIResponse) {
    const nodeStats = [
        { name: 'Version', value: apiResponse.version },
        { name: 'Database', value: apiResponse.store_vendor },
        { name: 'Node Uptime', value: sToTime(apiResponse.nodeUptime) },
        { name: 'Peers', value: apiResponse.numPeers },
    ];

    const blockStats = [
        { name: 'Current Blocks', value: apiResponse.currentBlock.toLocaleString() },
        { name: 'Cemented Blocks', value: apiResponse.cementedBlocks.toLocaleString() },
        { name: 'Unchecked Blocks', value: apiResponse.uncheckedBlocks.toLocaleString() },
        { name: 'Sync Status', value: `${apiResponse.blockSync}%` },
    ];

    const nodeAccountStats = [
        {
            name: 'Balance',
            value: `${rawToBan(apiResponse.accBalanceRaw).toLocaleString()} BAN`,
        },
        {
            name: 'Pending',
            value: `${rawToBan(apiResponse.accPendingRaw).toLocaleString()} BAN`,
        },
        { name: 'Representative', value: apiResponse.repAccount },
        {
            name: 'Voting Weight',
            value: `${rawToBan(apiResponse.votingWeightRaw).toLocaleString()} BAN`,
        },
    ];

    const systemStats = [
        { name: 'Host', value: apiResponse.nodeName },
        { name: 'Location', value: apiResponse.nodeLocation },
        { name: 'Load', value: apiResponse.systemLoad },
        {
            name: 'Memory Used',
            value: `${Math.round(apiResponse.usedMem).toLocaleString()} / ${Math.round(
                apiResponse.totalMem
            ).toLocaleString()} MB`,
        },
    ];
    return { nodeStats, blockStats, nodeAccountStats, systemStats };
}
