import axios from 'axios';

async function rpcPost<T>(data: any): Promise<T> {
    const response = await axios.post<T>(
        `${process.env.NEXT_PUBLIC_nodeUrl}:${process.env.NEXT_PUBLIC_nodeRpcPort}`,
        data,
        {}
    );
    return response.data;
}

export function getTelemetry(): Promise<Telemetry> {
    return rpcPost({
        action: 'telemetry',
        address: '127.0.0.1',
        port: process.env.NEXT_PUBLIC_nodeTcpPort,
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
        account: process.env.NEXT_PUBLIC_representativeAccount,
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
