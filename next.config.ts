import type { NextConfig } from "next";
import { readFileSync } from "fs";
import path from "path";

function getIndexNowKeyForRewrite(): string | null {
  const fromEnv = process.env.INDEXNOW_KEY?.trim();
  if (fromEnv) return fromEnv;
  try {
    const raw = readFileSync(
      path.join(process.cwd(), "data", "indexnow", "key.txt"),
      "utf8"
    );
    const key = raw.trim();
    return key.length >= 8 ? key : null;
  } catch {
    return null;
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async rewrites() {
    const key = getIndexNowKeyForRewrite();
    if (!key) return [];
    return [
      {
        source: `/${key}.txt`,
        destination: "/api/indexnow/key",
      },
    ];
  },
};

export default nextConfig;
