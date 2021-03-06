import { Banner, Error, NodeAccount, StatsCard } from '@components';
import getDigestedApi from '@helper/getDigestedApi';
import axios from 'axios';
import Head from 'next/head';
import useSWR from 'swr';

export default function Home() {
    const { data, error } = useSWR<APIResponse, Error>(`/api`, (url: string) =>
        axios.get<APIResponse>(url).then((res) => res.data)
    );
    const { nodeStats, blockStats, nodeAccountStats, systemStats } = getDigestedApi(data);

    if (error) {
        return <Error />;
    }
    return (
        <>
            <Head>
                <title>Bananode Monitor</title>
                <meta charSet='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <meta
                    name='description'
                    content={`Name: ${process.env.NEXT_PUBLIC_nodeName},\nLocation: ${process.env.NEXT_PUBLIC_nodeLocation}`}
                />
                <meta itemProp='name' content='Bananode Monitor' />
                <meta
                    itemProp='description'
                    content={`Name: ${process.env.NEXT_PUBLIC_nodeName},\nLocation: ${process.env.NEXT_PUBLIC_nodeLocation}`}
                />
                <meta itemProp='image' content={`${process.env.NEXT_PUBLIC_hostUrl}/monkey.png`} />
                <meta property='og:url' content={process.env.NEXT_PUBLIC_hostUrl} />
                <meta property='og:type' content='website' />
                <meta property='og:title' content='Bananode Monitor' />
                <meta property='og:author' content='Eulentier' />
                <meta
                    property='og:description'
                    content={`Name: ${process.env.NEXT_PUBLIC_nodeName},\nLocation: ${process.env.NEXT_PUBLIC_nodeLocation}`}
                />
                <meta property='og:image' content={`${process.env.NEXT_PUBLIC_hostUrl}/monkey.png`} />
                <meta name='twitter:card' content='app' />
                <meta name='twitter:title' content='Bananode Monitor' />
                <meta
                    name='twitter:description'
                    content={`Name: ${process.env.NEXT_PUBLIC_nodeName},\nLocation: ${process.env.NEXT_PUBLIC_nodeLocation}`}
                />
                <meta name='twitter:image' content={`${process.env.NEXT_PUBLIC_hostUrl}/monkey.png`} />
            </Head>
            <Banner />
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
