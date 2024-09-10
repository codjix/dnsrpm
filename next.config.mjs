const output = process.env.OUTPUT;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output,
  // reactStrictMode: false,
  images: { unoptimized: output == "standalone" },
  sassOptions: {
    prependData: `@import "#a/styles/_mantine.scss";`,
    includePaths: ["./src/assets/styles"],
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    serverSourceMaps: false,
  },
  webpack: (config) => {
    config.externals.push("bun:sqlite");
    return config;
  },
};

export default nextConfig;
