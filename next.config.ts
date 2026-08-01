import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/paths";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: BASE_PATH,
  // GitHub Pages needs every route as <route>/index.html, not <route>.html —
  // otherwise client-side <Link> navigation (which normalizes to a trailing
  // slash) hits an empty directory with no index.html and 404s.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
