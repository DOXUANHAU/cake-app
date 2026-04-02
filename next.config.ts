import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Apply CORS only to API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-Requested-With, Content-Type, Authorization, Accept, Origin",
          },
          {
            key: "Vary",
            value: "Origin",
          },
        ],
      },
    ];
  },

  // Use hostnames only here (no protocol)
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;