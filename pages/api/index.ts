import { nodeLocation, nodeName, representativeAccount } from '@config';
import fetchWithCache from '@helper/fetchWithCache';
import initMiddleware from '@helper/initMiddleware';
import { getBlockSync } from '@helper/util';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const cors = initMiddleware(Cors({ methods: ['GET'] }));

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
    await cors(req, res);

    const { version, telemetry, accountInfo, systemInfo, stats, telemetryAvg, confirmationInfo } =
        await fetchWithCache();
    const currentBlock = parseFloat(telemetry.block_count);
    const blockSync = getBlockSync(currentBlock, parseFloat(telemetryAvg.block_count));

    const data = {
        node_account: representativeAccount,
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
        acc_pending_raw: parseFloat(accountInfo.pending),
        rep_account: accountInfo.representative,
        voting_weight_raw: parseFloat(accountInfo.weight),
        system_load: systemInfo.systemLoad,
        used_mem: systemInfo.usedMem,
        total_mem: systemInfo.totalMem,
        node_name: nodeName,
        node_uptime: parseFloat(telemetry.uptime),
        node_location: nodeLocation,
        stats,
        telemetry_avg: telemetryAvg,
        block_sync: blockSync,
    };

    return res.status(200).json(data);
}
