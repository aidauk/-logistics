/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Статический экспорт для GitLab Pages
  output: "export",
  images: {
    unoptimized: true,
  },
  // Для работы на GitLab Pages с подпапками
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
};

export default nextConfig;


