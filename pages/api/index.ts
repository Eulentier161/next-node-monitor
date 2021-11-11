import { hostname, location, pullFromNode } from '@config';
import { getAccountInfo, getTelemetry, getVersion } from '@helper/axios';
import { fixBigNumber, getPlaceholderData, msToTime, rawToBan } from '@helper/util';
import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
    if (!pullFromNode) {
        return res.status(200).json(getPlaceholderData());
    }

    const telemetry = await getTelemetry();
    const version = await getVersion();
    const accountInfo = await getAccountInfo();

    const blockStats = [
        { name: 'Current Blocks', value: fixBigNumber(telemetry.block_count) },
        { name: 'Cemented Blocks', value: fixBigNumber(telemetry.cemented_count) },
        { name: 'Unchecked Blocks', value: fixBigNumber(telemetry.unchecked_count) },
        {
            name: 'Sync Status',
            value: `${Math.round((parseInt(telemetry.cemented_count) / parseInt(telemetry.block_count)) * 100)}%`,
        },
    ];

    const nodeStats = [
        { name: 'Version', value: `${telemetry.major_version}.${telemetry.minor_version}` },
        { name: 'Database', value: version.store_vendor },
        { name: 'Node Uptime', value: msToTime(parseInt(telemetry.uptime)) },
        { name: 'Peers', value: fixBigNumber(telemetry.peer_count) },
    ];

    const nodeAccountStats = [
        {
            name: 'Balance',
            value: `${fixBigNumber(rawToBan(parseInt(accountInfo.balance)))} BAN`,
        },
        {
            name: 'Pending',
            value: `${fixBigNumber(rawToBan(parseInt(accountInfo.pending)))} BAN`,
        },
        { name: 'Representative', value: accountInfo.representative },
        {
            name: 'Voting Weight',
            value: `${fixBigNumber(rawToBan(parseInt(accountInfo.weight)))} BAN`,
        },
    ];

    const systemStats = [
        { name: 'Host', value: hostname },
        { name: 'Location', value: location },
        { name: 'Load', value: `${fixBigNumber(os.loadavg()[0])}` },
        {
            name: 'Memory Used',
            value: `${fixBigNumber(Math.round(os.freemem() / 1000000))} / ${fixBigNumber(
                Math.round(os.totalmem() / 1000000)
            )} MB`,
        },
    ];

    return res.status(200).json({ blockStats, nodeStats, nodeAccountStats, systemStats });
}
