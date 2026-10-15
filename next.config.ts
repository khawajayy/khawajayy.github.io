import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (root user site — no basePath needed)
  output: "export",
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
