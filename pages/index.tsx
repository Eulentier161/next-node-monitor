import Banner from '@components/Banner';
import Header from '@components/Header';
import NodeAccount from '@components/NodeAccount';
import StatsCard from '@components/StatsCard';
import { banner, hostUrl, refreshInterval, representativeAccount } from '@config';
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

    return (
        <>
            <Header />
            {banner.enable ? <Banner /> : null}
            <NodeAccount
                header={'Node Account'}
                item={{
                    name: 'Address',
                    value: representativeAccount,
                }}
            />
            <div className='row'>
                <StatsCard header={'Node'} items={state.nodeStats} />
                <StatsCard header={'Blocks'} items={state.blockStats} />
                <StatsCard header={'Node Account'} items={state.nodeAccountStats} />
                <StatsCard header={'System'} items={state.systemStats} />
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
