import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  async redirects() {
    return [
      {
        source: '/missie',
        destination: '/over-ons',
        permanent: true,
      },
      {
        source: '/tarief-berekenen',
        destination: '/blog/wat-kost-een-brandwacht-in-2025',
        permanent: true,
      },
      {
        source: '/blog/wanneer-is-een-zelfstandige-brandwacht-verplicht-bij-evenementen',
        destination: '/blog/wanneer-is-een-zelfstandige-brandwacht-vereist-bij-evenementen',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['www.probrandwacht.nl', 'probrandwacht.nl'],
  },
  async headers() {
    return [
      {
        source: '/:all*(js|css|svg|png|jpg|jpeg|webp|avif|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
