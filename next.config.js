/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to https://gojo1729.github.io/ (root), leave basePath empty
  // If deploying to https://gojo1729.github.io/portfolio, set basePath: "/portfolio"
  basePath: "",
  trailingSlash: true,
};

module.exports = nextConfig;
