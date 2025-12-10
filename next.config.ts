import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: "https",
        hostname: "chirps-chat.sirv.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      }
    ],
    qualities: [25, 50, 60, 70, 75, 90],
  }
};

export default nextConfig;