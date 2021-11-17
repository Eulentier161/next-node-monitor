import { refreshInterval } from '@config';
import '@styles/globals.scss';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ refreshInterval: refreshInterval, fetcher: (url) => axios(url).then((res) => res.data) }}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}
export default MyApp;
