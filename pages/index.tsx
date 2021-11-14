import Banner from '@components/Banner';
import Footer from '@components/Footer';
import Header from '@components/Header';
import NodeAccount from '@components/NodeAccount';
import StatsCard from '@components/StatsCard';
import { banner, hostUrl, refreshInterval } from '@config';
import getDigestedApi from '@helper/getDigestedApi';
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

    const { nodeStats, blockStats, nodeAccountStats, systemStats } = getDigestedApi(state);

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
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const response = await axios.get<APIResponse>(`${hostUrl}/api`);
    return {
        props: response.data,
    };
}
