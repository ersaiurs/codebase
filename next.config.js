/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Matikan linting saat build di Vercel
  },
  output: 'export', // ✅ Tambahkan ini agar semua halaman statis diekspor
};

module.exports = nextConfig;
