/** @type {import('next').NextConfig} */

// Todo o site é servido sob este prefixo: <domínio>/brazilionaires
const basePath = "/brazilionaires";

const nextConfig = {
  reactStrictMode: true,
  basePath,
  // Exposto ao client para montar URLs absolutas (QR codes, etc.)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
