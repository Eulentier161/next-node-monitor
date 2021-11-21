import Footer from '@components/Footer';
import Header from '@components/Header';
import { refreshInterval } from '@config';
import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

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
