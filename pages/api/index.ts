import { fetchNodeInfoWithCache, fetchSystemInfoWithCache } from '@helper/fetchWithCache';
import initMiddleware from '@helper/initMiddleware';
import { getBlockSync, rawToBan } from '@helper/util';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const cors = initMiddleware(Cors({ methods: ['GET'] }));

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
    await cors(req, res);

    const { version, telemetry, accountInfo, stats, telemetryAvg, confirmationInfo } = await fetchNodeInfoWithCache();
    const { cpu_data, mem_data } = await fetchSystemInfoWithCache();

    const currentBlock = parseFloat(telemetry.block_count);
    const blockSync = getBlockSync(currentBlock, parseFloat(telemetryAvg.block_count));

    const data: APIResponse = {
        node_account: process.env.NEXT_PUBLIC_representativeAccount,
        version: version.node_vendor,
        store_version: parseFloat(version.store_version),
        protocol_version: parseFloat(version.protocol_version),
        store_vendor: version.store_vendor,
        current_block: currentBlock,
        unchecked_blocks: parseFloat(telemetry.unchecked_count),
        cemented_blocks: parseFloat(telemetry.cemented_count),
        num_peers: parseFloat(telemetry.peer_count),
        confirmation_info: confirmationInfo,
        acc_balance_raw: parseFloat(accountInfo.balance),
        acc_balance: rawToBan(parseFloat(accountInfo.balance)),
        acc_pending_raw: parseFloat(accountInfo.pending),
        acc_pending: rawToBan(parseFloat(accountInfo.pending)),
        rep_account: accountInfo.representative,
        voting_weight_raw: parseFloat(accountInfo.weight),
        voting_weight: rawToBan(parseFloat(accountInfo.weight)),
        system_load: cpu_data.load_average_1min,
        used_mem: mem_data.used_mb,
        total_mem: mem_data.total_mb,
        node_name: process.env.NEXT_PUBLIC_nodeName,
        node_uptime: parseFloat(telemetry.uptime),
        node_location: process.env.NEXT_PUBLIC_nodeLocation,
        stats,
        telemetry_avg: telemetryAvg,
        block_sync: blockSync,
    };

    return res.status(200).json(data);
}
