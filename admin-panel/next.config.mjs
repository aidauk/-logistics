/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    // Базовый URL API. Должен совпадать с PORT сервера NestJS.
    API_URL: "http://localhost:4000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        // pathname: "/product-images/**", // Adjust the path pattern if necessary
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
