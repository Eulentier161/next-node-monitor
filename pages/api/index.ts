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
    const currentBlock = parseInt(telemetry.block_count);
    const blockSync = getBlockSync(currentBlock, parseInt(telemetryAvg.block_count));

    const data = {
        nodeAccount: representativeAccount,
        version: version.node_vendor,
        store_version: parseInt(version.store_version),
        protocol_version: parseInt(version.protocol_version),
        store_vendor: version.store_vendor,
        currentBlock,
        uncheckedBlocks: parseInt(telemetry.unchecked_count),
        cementedBlocks: parseInt(telemetry.cemented_count),
        numPeers: parseInt(telemetry.peer_count),
        confirmationInfo,
        accBalanceRaw: parseInt(accountInfo.balance),
        accPendingRaw: parseInt(accountInfo.pending),
        repAccount: accountInfo.representative,
        votingWeightRaw: parseInt(accountInfo.weight),
        systemLoad: systemInfo.systemLoad,
        usedMem: systemInfo.usedMem,
        totalMem: systemInfo.totalMem,
        nodeName,
        nodeUptime: parseInt(telemetry.uptime),
        nodeLocation,
        stats,
        telemetryAvg,
        blockSync,
    };

    return res.status(200).json(data);
}
