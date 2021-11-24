import { Footer, Header } from '@components';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ refreshInterval: parseInt(process.env.NEXT_PUBLIC_refreshInterval) }}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </SWRConfig>
    );
}
export default MyApp;
