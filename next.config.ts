import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['*'], // Permitir cualquier dominio
    remotePatterns: [],
    unoptimized: true, // Desactiva la optimización para permitir cualquier origen
  },
};

export default nextConfig;
