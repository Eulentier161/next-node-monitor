import Banner from '@components/Banner';
import NodeAccount from '@components/NodeAccount';
import StatsCard from '@components/StatsCard';
import { banner, hostUrl, nodeLocation, nodeName } from '@config';
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
                <meta name='description' content={`Name: ${nodeName},\nLocation: ${nodeLocation}`} />
                <meta itemProp='name' content='Bananode Monitor' />
                <meta itemProp='description' content={`Name: ${nodeName},\nLocation: ${nodeLocation}`} />
                <meta itemProp='image' content={`${hostUrl}/monkey.png`} />
                <meta property='og:url' content={hostUrl} />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Bananode Monitor' />
                <meta property='og:author' content='Eulentier' />
                <meta property='og:description' content={`Name: ${nodeName},\nLocation: ${nodeLocation}`} />
                <meta property='og:image' content={`${hostUrl}/monkey.png`} />
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:title' content='Bananode Monitor' />
                <meta name='twitter:description' content={`Name: ${nodeName},\nLocation: ${nodeLocation}`} />
                <meta name='twitter:image' content={`${hostUrl}/monkey.png`} />
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
