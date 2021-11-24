import axios from 'axios';
import { nodeUrl, nodeRpcPort, nodeTcpPort, representativeAccount } from '../config.env';

async function rpcPost<T>(data: any): Promise<T> {
    const response = await axios.post<T>(`${nodeUrl}:${nodeRpcPort}`, data, {});
    return response.data;
}

export function getTelemetry(): Promise<Telemetry> {
    return rpcPost({
        action: 'telemetry',
        address: '127.0.0.1',
        port: nodeTcpPort,
    });
}

export function getTelemetryAvg(): Promise<Telemetry> {
    return rpcPost({ action: 'telemetry' });
}

export function getVersion(): Promise<Version> {
    return rpcPost({ action: 'version' });
}

export function getAccountInfo(): Promise<AccountInfo> {
    return rpcPost({
        action: 'account_info',
        account: representativeAccount,
        representative: true,
        weight: true,
        pending: true,
    });
}

export function getStats(): Promise<StatsCounters> {
    return rpcPost({ action: 'stats', type: 'counters' });
}

export function getConfirmationHistory(): Promise<ConfirmationHistory> {
    return rpcPost({ action: 'confirmation_history' });
}
