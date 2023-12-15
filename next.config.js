/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        MONGODB_URI: process.env.MONGODB_URI || "",
        MONGODB_DB: process.env.MONGODB_DB || "",
        SECRETKEY: process.env.SECRETKEY || ""
    }
};

module.exports = nextConfig;
