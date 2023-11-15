/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    httpAgentOptions: {
        keepAlive: true
    }
}

module.exports = nextConfig
