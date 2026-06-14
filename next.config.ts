import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  devIndicators: false,
  // Allow the dev server to be reached from devices on the local network
  // (e.g. testing on a phone via the machine's LAN IP). Next blocks cross-origin
  // requests to dev-only assets by default, which leaves the page rendered but
  // non-interactive (no hydration / client navigation) on those devices.
  allowedDevOrigins: ['192.168.0.110', '192.168.0.*'],
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
