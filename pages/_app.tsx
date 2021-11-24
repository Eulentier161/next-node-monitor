import { Footer, Header } from '@components';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { refreshInterval } from '../config.env';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ refreshInterval: refreshInterval }}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </SWRConfig>
    );
}
export default MyApp;
