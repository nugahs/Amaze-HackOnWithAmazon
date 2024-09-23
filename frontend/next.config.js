/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
