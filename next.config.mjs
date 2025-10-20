/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
    output: 'standalone',
    compress: true,
    productionBrowserSourceMaps: false,
    images: {
        domains: ["res.cloudinary.com", "images.unsplash.com"],
        formats: ["image/avif", "image/webp"],
    },
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
      webpack(config, { dev }) {
    // Strip console logs and debug code in production
    if (!dev) {
      config.optimization.minimizer = config.optimization.minimizer || [];
      config.optimization.minimizer.forEach((plugin) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  }
};


const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
