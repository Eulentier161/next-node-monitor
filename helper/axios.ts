import { nodeRpcPort, nodeTcpPort, nodeURL, representativeAccount } from '@config';
import axios from 'axios';

const rpc = axios.create({
    baseURL: `${nodeURL}:${nodeRpcPort}`,
});

const rpcPost = async (data: any) => {
    const response = await rpc.post('', data, {});
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export function getTelemetry(): Promise<Telemetry> {
    const data = {
        action: 'telemetry',
        address: '127.0.0.1',
        port: nodeTcpPort,
    };
    return rpcPost(data);
}

export function getVersion(): Promise<Version> {
    const data = {
        action: 'version',
    };
    return rpcPost(data);
}

export function getAccountInfo(): Promise<AccountInfo> {
    const data = {
        action: 'account_info',
        account: representativeAccount,
        representative: true,
        weight: true,
        pending: true,
    };
    return rpcPost(data);
}
