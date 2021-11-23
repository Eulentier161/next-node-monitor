declare global {
    namespace NodeJS {
        interface ProcessEnv {
            representativeAccount: string;
            nodeName: string;
            nodeLocation: string;
            hostUrl: string;
            nodeUrl: string;
            nodeTcpPort: string;
            nodeRpcPort: string;
            refreshInterval: string;
            bannerHeading: string;
            bannerParagraph: string;
        }
    }
}
export {};
