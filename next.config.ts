import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  // This is needed for compatibility with the OG PHP node monitor
  // some external tooling expects the api endpoint to be api.php
  rewrites: async () => [
    { source: "/api.php", destination: "/api" },
    { source: "/manifest.json", destination: "/manifest.webmanifest" },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monkey.banano.cc",
        pathname: "/api/v1/monkey/*",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
