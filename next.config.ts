import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /** config cross-origin problems */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
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
        ],
      },
    ];
  }

};

module.exports = {
  allowedDevOrigins: ['localhost:3000', 'http://localhost:3000'],
}



export default nextConfig;
