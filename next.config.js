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
        destination: '/blog/brandwacht-inzet-context-2026',
        permanent: true,
      },
      {
        source: '/blog/zzp-brandwacht-tarieven-2025',
        destination: '/blog/brandwacht-inzet-context-2026',
        permanent: true,
      },
      {
        source: '/blog/zzp-brandwacht-tarieven-2025-wat-is-reeel',
        destination: '/blog/brandwacht-inzet-context-2026',
        permanent: true,
      },
      {
        source: '/blog/5-meest-gemaakte-fouten-bij-zelfstandige-brandwacht-inhuur',
        destination: '/blog/5-veelvoorkomende-aandachtspunten-bij-brandwacht-inzet',
        permanent: true,
      },
      {
        source: '/blog/5-meest-gemaakte-fouten-bij-brandwacht-inzet',
        destination: '/blog/5-veelvoorkomende-aandachtspunten-bij-brandwacht-inzet',
        permanent: true,
      },
      {
        source: '/blog/wanneer-is-een-zelfstandige-brandwacht-verplicht-bij-evenementen',
        destination: '/blog/wanneer-is-een-zelfstandige-brandwacht-vereist-bij-evenementen',
        permanent: true,
      },
      {
        source: '/blog/schijnveiligheid-als-systeemfout',
        destination: '/blog/brandwacht-als-signaaldrager',
        permanent: true,
      },
      {
        source: '/blog/brandwachtenmarkt-schijnveiligheid-en-systeemwerking',
        destination: '/blog/brandwacht-als-signaaldrager',
        permanent: true,
      },
      {
        source: '/blog/brandveiligheidsmarkt-nederland-trends-en-regelgeving',
        destination: '/blog/brandwacht-inzet-context-2026',
        permanent: true,
      },
      {
        source: '/blog/veiligheid-vraagt-om-nuance',
        destination: '/blog/aanwezigheid-is-geen-veiligheid',
        permanent: true,
      },
      {
        source: '/blog/positie-brandwacht-veiligheidsketen',
        destination: '/blog/verantwoordelijkheid-in-de-veiligheidsketen',
        permanent: true,
      },
      {
        source: '/blog/marktdruk-en-veiligheidskwaliteit',
        destination: '/blog/verantwoordelijkheid-in-de-veiligheidsketen',
        permanent: true,
      },
      {
        source: '/blog/onbedoelde-veiligheidsillusie-als-systeemfout',
        destination: '/blog/brandwacht-als-signaaldrager',
        permanent: true,
      },
      {
        source: '/blog/brandwachtenmarkt-onbedoelde-veiligheidsillusie-en-systeemwerking',
        destination: '/blog/brandwacht-als-signaaldrager',
        permanent: true,
      },
      {
        source: '/blog/systeem-botst-met-vakmanschap',
        destination: '/blog/brandwacht-als-signaaldrager',
        permanent: true,
      },
      {
        source: '/blog/vakmanschap-onder-druk-in-onvolwassen-markt',
        destination: '/blog/brandwacht-als-signaaldrager',
        permanent: true,
      },
      {
        source: '/blog/compliance-is-niet-veiligheid',
        destination: '/blog/aanwezigheid-is-geen-veiligheid',
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
