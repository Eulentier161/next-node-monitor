import { refreshInterval } from '@config';
import initMiddleware from '@helper/initMiddleware';
import Cors from 'cors';
import cache from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { cpu, drive, mem, os } from 'node-os-utils';

const cors = initMiddleware(Cors({ methods: ['GET'] }));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);

    async function fetchWithCache() {
        const value = cache.get('systemDataCache');
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
        function fixDriveInfoType(x: string | number): number {
            return typeof x === 'string' ? parseFloat(x) : x;
        }
        const drive_data = {
            total_gb: fixDriveInfoType(driveInfo.totalGb),
            used_gb: fixDriveInfoType(driveInfo.usedGb),
            used_percentage: fixDriveInfoType(driveInfo.usedPercentage),
            free_gb: fixDriveInfoType(driveInfo.freeGb),
            free_percentage: fixDriveInfoType(driveInfo.freePercentage),
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

        const data = { cpu_data, drive_data, mem_data, os_data };
        cache.put('systemDataCache', data, refreshInterval - refreshInterval * 0.1);
        return data;
    }

    const data = await fetchWithCache();
    res.status(200).json(data);
}
