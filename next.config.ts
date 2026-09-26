import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables React's <ViewTransition> for route-to-route morphs.
    viewTransition: true,
  },
};

export default nextConfig;
