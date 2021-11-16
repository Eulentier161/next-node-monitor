import Banner from '@components/Banner';
import Footer from '@components/Footer';
import Header from '@components/Header';
import NodeAccount from '@components/NodeAccount';
import StatsCard from '@components/StatsCard';
import useSWR from 'swr';
import { banner, hostUrl, nodeName, refreshInterval } from '@config';
import getDigestedApi from '@helper/getDigestedApi';
import axios from 'axios';
import Head from 'next/head';

export default function Home() {
    const { data } = useSWR<APIResponse>(`${hostUrl}/api`, (url: string) => axios.get(url).then((res) => res.data), {
        refreshInterval: refreshInterval,
    });

    const { nodeStats, blockStats, nodeAccountStats, systemStats } = getDigestedApi(data);

    return (
        <>
            <Head>
                <title>Bananode Monitor</title>
                <meta charSet='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <meta property='og:type' content='website' />
                <meta property='og:url' content={hostUrl} />
                <meta property='og:title' content='Bananode Monitor' />
                <meta property='og:author' content={nodeName} />
                <meta property='og:image' content={`${hostUrl}/monkey.svg`} />
            </Head>
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
