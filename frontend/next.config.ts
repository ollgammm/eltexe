import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  reactCompiler: true,
  images: {
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
