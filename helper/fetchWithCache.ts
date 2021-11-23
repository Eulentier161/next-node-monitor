import { getAccountInfo, getStats, getTelemetry, getTelemetryAvg, getVersion } from '@helper/axios';
import cache from 'memory-cache';
import { cpu, drive, mem, os } from 'node-os-utils';
import { getConfirmationInfo } from './util';

const refreshInterval = parseInt(process.env.refreshInterval);
const refreshCacheInterval = refreshInterval - refreshInterval * 0.1;

export async function fetchNodeInfoWithCache(): Promise<RPCResponse> {
    const value: RPCResponse = cache.get('nodeInfo'); // eslint-disable-line
    if (value) {
        return value;
    }

    const telemetry = await getTelemetry();
    const telemetryAvg = await getTelemetryAvg();
    const version = await getVersion();
    const accountInfo = await getAccountInfo();
    const stats = await getStats();
    const confirmationInfo = await getConfirmationInfo();

    const nodeInfo: RPCResponse = { telemetry, telemetryAvg, version, accountInfo, stats, confirmationInfo };
    cache.put('nodeInfo', nodeInfo, refreshCacheInterval);
    return nodeInfo;
}

export async function fetchSystemInfoWithCache(): Promise<SystemInfo> {
    const value: SystemInfo = cache.get('systemInfo'); // eslint-disable-line
    if (value) {
        return value;
    }

    const cpuLoadAverageArray = cpu.loadavg();
    const cpu_data = {
        count: cpu.count(),
        model: cpu.model(),
        load_average_1min: cpuLoadAverageArray[0],
        load_average_5min: cpuLoadAverageArray[1],
        load_average_15min: cpuLoadAverageArray[2],
    };

    const driveInfo = await drive.info('/');
    const drive_data = {
        total_gb: parseFloat(driveInfo.totalGb),
        used_gb: parseFloat(driveInfo.usedGb),
        used_percentage: parseFloat(driveInfo.usedPercentage),
        free_gb: parseFloat(driveInfo.freeGb),
        free_percentage: parseFloat(driveInfo.freePercentage),
    };

    const memInfo = await mem.info();
    const mem_data = {
        total_mb: memInfo.totalMemMb,
        used_mb: memInfo.usedMemMb,
        used_percentage: Math.round((100 - memInfo.freeMemPercentage) * 100) / 100,
        free_mb: memInfo.freeMemMb,
        free_percentage: memInfo.freeMemPercentage,
    };

    const os_data = {
        uptime: os.uptime(),
        platform: os.platform(),
        os: await os.oos(),
        arch: os.arch(),
    };

    const systemInfo: SystemInfo = { cpu_data, drive_data, mem_data, os_data };
    cache.put('systemInfo', systemInfo, refreshCacheInterval);
    return systemInfo;
}
