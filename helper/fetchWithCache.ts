import { refreshInterval } from '@config';
import { getAccountInfo, getStats, getTelemetry, getTelemetryAvg, getVersion } from '@helper/axios';
import cache from 'memory-cache';
import { cpu, mem } from 'node-os-utils';
import { getConfirmationInfo } from './util';

export default async function fetchWithCache(): Promise<RPCResponse> {
    const value = cache.get('cachedData');
    if (value) {
        return value;
    }

    const telemetry = await getTelemetry();
    const telemetryAvg = await getTelemetryAvg();
    const version = await getVersion();
    const accountInfo = await getAccountInfo();
    const stats = await getStats();
    const memInfo = await mem.info();
    const systemInfo = {
        systemLoad: cpu.loadavg()[0],
        totalMem: memInfo.totalMemMb,
        usedMem: memInfo.usedMemMb,
    };
    const confirmationInfo = await getConfirmationInfo();

    cache.put(
        'cachedData',
        { telemetry, version, accountInfo, systemInfo, stats, telemetryAvg, confirmationInfo },
        refreshInterval - refreshInterval * 0.1
    );
    return { telemetry, version, accountInfo, systemInfo, stats, telemetryAvg, confirmationInfo };
}
