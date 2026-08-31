import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires quality values to be allowlisted. 90 keeps the
    // pixel art's hard edges clean; WebP at the default 75 rings.
    qualities: [75, 90],
  },
};

export default nextConfig;
