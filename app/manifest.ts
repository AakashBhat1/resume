import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aakash Bhat Portfolio",
    short_name: "Aakash Portfolio",
    description: "Portfolio website for Aakash Bhat",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF6EE",
    theme_color: "#FBF6EE",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
