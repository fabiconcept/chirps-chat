import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: "https",
        hostname: "chirps-chat.sirv.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
