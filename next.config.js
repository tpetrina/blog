const withMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [require("remark-prism")],
  },
})({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
});
