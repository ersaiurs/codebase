const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Matikan linting saat build di Vercel
  },
};

module.exports = nextConfig;
