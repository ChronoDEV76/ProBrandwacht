/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // Oude city-URLs → nieuwe structuur
      {
        source: '/brandwacht-inhuren/:city',
        destination: '/steden/:city',
        permanent: true,
      },

      // Legacy slug zonder city → stuur naar de nieuwe opdrachtgeverspagina
      {
        source: '/brandwacht-inhuren',
        destination: '/opdrachtgevers/brandwacht-inhuren',
        permanent: true,
      },

      // Eventueel: generieke overzichtspagina
      // (alleen gebruiken als je zo'n pagina hebt)
      // {
      //   source: '/brandwacht-inhuren',
      //   destination: '/steden',
      //   permanent: true,
      // },
    ];
  },

  // Eventueel extra SEO/perf tweaks later hier toevoegen
};

export default nextConfig;
