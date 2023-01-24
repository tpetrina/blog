/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  productionBrowserSourceMaps: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    return config;
  },
};
