import Footer from '@components/Footer';
import Header from '@components/Header';
import { refreshInterval } from '@config';
import '@styles/globals.scss';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ refreshInterval: refreshInterval, fetcher: (url) => axios(url).then((res) => res.data) }}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </SWRConfig>
    );
}
export default MyApp;
