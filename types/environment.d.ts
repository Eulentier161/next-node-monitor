declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_representativeAccount: string;
            NEXT_PUBLIC_nodeName: string;
            NEXT_PUBLIC_nodeLocation: string;
            NEXT_PUBLIC_hostUrl: string;
            NEXT_PUBLIC_nodeUrl: string;
            NEXT_PUBLIC_nodeTcpPort: string;
            NEXT_PUBLIC_nodeRpcPort: string;
            NEXT_PUBLIC_refreshInterval: string;
            NEXT_PUBLIC_bannerHeading: string;
            NEXT_PUBLIC_bannerParagraph: string;
        }
    }
}
export {};
