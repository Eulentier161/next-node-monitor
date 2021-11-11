import { hostname, location, refreshInterval, representativeAccount } from '@config';
import { getAccountInfo, getTelemetry, getVersion } from '@helper/axios';
import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
    async function fetchWithCache(): Promise<RPCResponse> {
        const value = cache.get('cachedData');
        if (value) {
            return value;
        } else {
            const telemetry = await getTelemetry();
            const version = await getVersion();
            const accountInfo = await getAccountInfo();
            const totalMem = os.totalmem();
            const systemInfo = {
                systemLoad: os.loadavg()[0],
                totalMem: totalMem,
                usedMem: totalMem - os.freemem(),
            };

            cache.put(
                'cachedData',
                { telemetry, version, accountInfo, systemInfo },
                refreshInterval - refreshInterval * 0.1
            );
            return { telemetry, version, accountInfo, systemInfo };
        }
    }

    const cachedData = await fetchWithCache();

    const data = {
        nodeAccount: representativeAccount,
        version: cachedData.version.node_vendor,
        store_version: parseInt(cachedData.version.store_version),
        protocol_version: parseInt(cachedData.version.protocol_version),
        store_vendor: cachedData.version.store_vendor,
        currentBlock: parseInt(cachedData.telemetry.block_count),
        uncheckedBlocks: parseInt(cachedData.telemetry.unchecked_count),
        cementedBlocks: parseInt(cachedData.telemetry.cemented_count),
        numPeers: parseInt(cachedData.telemetry.peer_count),
        accBalanceRaw: parseInt(cachedData.accountInfo.balance),
        accPendingRaw: parseInt(cachedData.accountInfo.pending),
        repAccount: cachedData.accountInfo.representative,
        votingWeightRaw: parseInt(cachedData.accountInfo.weight),
        systemLoad: cachedData.systemInfo.systemLoad,
        usedMem: cachedData.systemInfo.usedMem,
        totalMem: cachedData.systemInfo.totalMem,
        nodeName: hostname,
        nodeUptime: parseInt(cachedData.telemetry.uptime),
        nodeLocation: location,
    };

    return res.status(200).json(data);
}
