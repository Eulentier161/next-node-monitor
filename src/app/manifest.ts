import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.METADATA_NAME,
    short_name: process.env.METADATA_SHORT_NAME,
    description: process.env.METADATA_DESCRIPTION,
    theme_color: "#FBDD11",
    background_color: "#212124",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
