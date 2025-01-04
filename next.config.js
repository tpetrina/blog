const withMarkdoc = require("@markdoc/next.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["md", "mdx", "mdoc", "js", "jsx", "ts", "tsx"],
  productionBrowserSourceMaps: true,
};

module.exports = withMarkdoc(/* options */)(nextConfig);
