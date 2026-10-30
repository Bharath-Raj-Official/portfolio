import type { NextConfig } from 'next';
import path from 'node:path';
const config:NextConfig={output:'export',basePath:'/portfolio',trailingSlash:true,turbopack:{root:path.resolve(process.cwd())},outputFileTracingRoot:path.resolve(process.cwd()),poweredByHeader:false,devIndicators:false,images:{unoptimized:true}};
export default config;
