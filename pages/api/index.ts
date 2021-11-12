import { hostname, location, refreshInterval, representativeAccount } from '@config';
import { getAccountInfo, getTelemetry, getVersion } from '@helper/axios';
import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cpu, mem } from 'node-os-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
    async function fetchWithCache(): Promise<RPCResponse> {
        const value = cache.get('cachedData');
        if (value) {
            return value;
        } else {
            const telemetry = await getTelemetry();
            const version = await getVersion();
            const accountInfo = await getAccountInfo();
            const memInfo = await mem.info();
            const systemInfo = {
                systemLoad: cpu.loadavg()[0],
                totalMem: memInfo.totalMemMb,
                usedMem: memInfo.usedMemMb,
            };

            cache.put(
                'cachedData',
                { telemetry, version, accountInfo, systemInfo },
                refreshInterval - refreshInterval * 0.1
            );
            return { telemetry, version, accountInfo, systemInfo };
        }
    }

    const { version, telemetry, accountInfo, systemInfo } = await fetchWithCache();
    const data = {
        nodeAccount: representativeAccount,
        version: version.node_vendor,
        store_version: parseInt(version.store_version),
        protocol_version: parseInt(version.protocol_version),
        store_vendor: version.store_vendor,
        currentBlock: parseInt(telemetry.block_count),
        uncheckedBlocks: parseInt(telemetry.unchecked_count),
        cementedBlocks: parseInt(telemetry.cemented_count),
        numPeers: parseInt(telemetry.peer_count),
        accBalanceRaw: parseInt(accountInfo.balance),
        accPendingRaw: parseInt(accountInfo.pending),
        repAccount: accountInfo.representative,
        votingWeightRaw: parseInt(accountInfo.weight),
        systemLoad: systemInfo.systemLoad,
        usedMem: systemInfo.usedMem,
        totalMem: systemInfo.totalMem,
        nodeName: hostname,
        nodeUptime: parseInt(telemetry.uptime),
        nodeLocation: location,
    };

    return res.status(200).json(data);
}
