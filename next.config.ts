/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    const base = process.env.NEXT_PUBLIC_API_URL;
    // Solo proxea en desarrollo y si hay base definida
    if (process.env.NODE_ENV === "development" && base) {
      return [
        {
          source: "/api/v1/:path*",
          destination: `${base.replace(/\/$/, "")}/api/v1/:path*`,
        },
      ];
    }
    return [];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.BUCKET_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
