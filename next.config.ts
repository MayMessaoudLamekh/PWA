import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is intentionally OFF: every page here is per-user and
  // rendered on request, so the classic dynamic model keeps the code simple
  // (no mandatory <Suspense> around cookies()/params reads).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
