module.exports = {
  poweredByHeader: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./src/scripts/generate-sitemap-json');
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // {
      //   source: '/kakao-api',
      //   destination:
      //     '//dapi.kakao.com/v2/maps/sdk.js?appkey=b4ac60bbe108db273adf13235b862d61&libraries=services,clusterer,drawing',
      // },
    ];
  },
};
