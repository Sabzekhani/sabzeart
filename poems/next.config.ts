import path from 'path'
import type { NextConfig } from 'next'

// This app lives in a subfolder of the repository; keep it self-contained.
const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
}

export default nextConfig
