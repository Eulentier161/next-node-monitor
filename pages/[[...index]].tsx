import Banner from '@components/Banner';
import NodeAccount from '@components/NodeAccount';
import StatsCard from '@components/StatsCard';
import { banner, hostUrl, nodeName } from '@config';
import getDigestedApi from '@helper/getDigestedApi';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
    const { data, error } = useSWR<APIResponse>(`/api`);
    const router = useRouter();
    useEffect(() => {
        if (error) {
            router.push('/500');
        }
    }, [error]);

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
