/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Статический экспорт для GitLab Pages
  output: "export",
  images: {
    unoptimized: true,
  },
  // Для работы на GitHub Pages
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
  trailingSlash: true,
};

export default nextConfig;




