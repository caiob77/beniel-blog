import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Servir formatos modernos (AVIF é ~30% menor que WebP).
    formats: ["image/avif", "image/webp"],
    // Cachear as imagens otimizadas por 1 ano (são estáticas).
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
