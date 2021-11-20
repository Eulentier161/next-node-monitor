import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        // function to get the prefered color scheme of the user on first page load
        const setInitialTheme = `function getUserPreference(){if(window.localStorage.getItem('theme')){return window.localStorage.getItem('theme')}return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.getElementsByTagName('html')[0].setAttribute('data-theme',getUserPreference())`;
        return (
            <Html>
                <Head />
                <body>
                    <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
