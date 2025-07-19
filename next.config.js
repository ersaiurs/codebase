/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // agar build tidak gagal karena lint
  },
  output: "export", // agar bisa dideploy static di Vercel
};

module.exports = nextConfig;
