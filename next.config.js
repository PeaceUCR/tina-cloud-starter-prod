module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: "",
      },
    ],
    domains: [
      'tailwindui.com',
      's3.eu-central-2.wasabisys.com',
      'picsum.photos',
      'bs-live-recording.s3.amazonaws.com',
      'burst.shopifycdn.com',
      's3.eu-central-2.wasabisys.com',
      'cdn.shopify.com',
      's3.us-east-1.wasabisys.com',
      'bs-staging-recording.s3.amazonaws.com',
      'lh3.googleusercontent.com',
      'cdn.filestackcontent.com'
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  output: "standalone",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
