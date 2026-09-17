import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";

/** LAN / WSL host IPs when dev runs with -H 0.0.0.0 (comma-separated in .env.local). */
const extraDevOrigins = (process.env.ALLOWED_DEV_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uploaded assets are served as static files; do not copy the local upload
  // archive into the admin download Function bundle.
  outputFileTracingExcludes: {
    "/api/admin/file-converter/app-archives/**/*": ["./public/uploads/**"],
    "/api/admin/upload": ["./public/uploads/**"],
    "/api/ctm/upload": ["./public/uploads/**"],
    "/api/ge-energy-tech/meter-order": ["./public/uploads/**"],
    "/api/ge-energy-tech/order-tracking": ["./public/uploads/**"],
    "/api/uploads/ctm-products/**/*": ["./public/uploads/**"],
  },
  // Allow browsers hitting dev via WSL/LAN IP (e.g. http://172.20.24.10:3005)
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "172.20.24.10",
    "strong-dory-enabled.ngrok-free.app",
    ...extraDevOrigins,
  ],
  // Force this folder as app root (parent C:\web\package-lock.json must not win)
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  // WSL + /mnt/c: avoid stale chunks and slow file watches (ChunkLoadError on app/page.js)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.zyrosite.com',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source:
          "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      {
        source: "/m-factory/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      // Legacy K-Energy API path → ge-energy
      { source: "/api/kenergy/:path*", destination: "/api/ge-energy/:path*" },
      // Energy dashboard short-path aliases
      { source: "/dashboard", destination: "/energy-dashboard/dashboard" },
      { source: "/current-monitor", destination: "/energy-dashboard/current-monitor" },
      { source: "/overview", destination: "/energy-dashboard/overview" },
      { source: "/monitor", destination: "/energy-dashboard/monitor" },
      { source: "/location", destination: "/energy-dashboard/location" },
      { source: "/devices-setting", destination: "/energy-dashboard/devices-setting" },
      { source: "/devices-setting/:path*", destination: "/energy-dashboard/devices-setting/:path*" },
      { source: "/meter-seting", destination: "/energy-dashboard/meter-seting" },
      { source: "/notifications", destination: "/energy-dashboard/notifications" },
    ];
  },
};

export default nextConfig;
