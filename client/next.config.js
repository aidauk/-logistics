/**   @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Базовый URL API. Должен совпадать с PORT сервера NestJS.
    API_URL: "http://localhost:4000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        // pathname: "/product-images/**", // Adjust the path pattern if necessary
      },
    ],
  },
};

module.exports = nextConfig;
