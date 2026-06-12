/** @type {import('next').NextConfig} */

// Todo o site é servido sob este prefixo: <domínio>/brazilionaires
const basePath = "/brazilionaires";

const nextConfig = {
  reactStrictMode: true,
  basePath,
  // Exposto ao client para montar URLs absolutas (QR codes, etc.)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Grafia alternativa (2 "L") → home oficial (1 "L"). basePath:false porque o
  // source está fora do prefixo do site.
  async redirects() {
    return [
      { source: "/brazillionaires", destination: basePath, permanent: false, basePath: false },
      {
        source: "/brazillionaires/:path*",
        destination: `${basePath}/:path*`,
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
