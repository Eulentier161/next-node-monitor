import Banner from '@components/Banner';
import Header from '@components/Header';
import NodeAccount from '@components/NodeAccount';
import StatsCard from '@components/StatsCard';
import { banner, hostUrl, refreshInterval } from '@config';
import { msToTime, rawToBan } from '@helper/util';
import axios from 'axios';
import { useState } from 'react';
import useInterval from 'react-useinterval';

export default function Home(props: APIResponse) {
    const [state, setState] = useState(props);

    useInterval(
        () =>
            axios.get<APIResponse>(`${hostUrl}/api`).then((response) => {
                setState(response.data);
            }),
        refreshInterval
    );

    const nodeStats = [
        { name: 'Version', value: state.version },
        { name: 'Database', value: state.store_vendor },
        { name: 'Node Uptime', value: msToTime(state.nodeUptime) },
        { name: 'Peers', value: state.numPeers },
    ];

    const blockStats = [
        { name: 'Current Blocks', value: state.currentBlock.toLocaleString() },
        { name: 'Cemented Blocks', value: state.cementedBlocks.toLocaleString() },
        { name: 'Unchecked Blocks', value: state.uncheckedBlocks.toLocaleString() },
        {
            name: 'Sync Status',
            value: `${Math.round(state.cementedBlocks / state.currentBlock) * 100}%`,
        },
    ];

    const nodeAccountStats = [
        {
            name: 'Balance',
            value: `${rawToBan(state.accBalanceRaw).toLocaleString()} BAN`,
        },
        {
            name: 'Pending',
            value: `${rawToBan(state.accPendingRaw).toLocaleString()} BAN`,
        },
        { name: 'Representative', value: state.repAccount },
        {
            name: 'Voting Weight',
            value: `${rawToBan(state.votingWeightRaw).toLocaleString()} BAN`,
        },
    ];

    const systemStats = [
        { name: 'Host', value: state.nodeName },
        { name: 'Location', value: state.nodeLocation },
        { name: 'Load', value: state.systemLoad },
        {
            name: 'Memory Used',
            value: `${Math.round(state.usedMem).toLocaleString()} / ${Math.round(state.totalMem).toLocaleString()} MB`,
        },
    ];

    return (
        <>
            <Header />
            {banner.enable ? <Banner /> : null}
            <NodeAccount />
            <div className='row'>
                <StatsCard header={'Node'} items={nodeStats} />
                <StatsCard header={'Blocks'} items={blockStats} />
                <StatsCard header={'Node Account'} items={nodeAccountStats} />
                <StatsCard header={'System'} items={systemStats} />
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const response = await axios.get<APIResponse>(`${hostUrl}/api`);
    return {
        props: response.data,
    };
}
