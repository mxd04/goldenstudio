/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'gsap'],
  },
}

export default nextConfig
