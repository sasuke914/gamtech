/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fsw-store.s3.sa-east-1.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'zxsxlbutylcszksglhqh.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
        ],
    },
};

module.exports = nextConfig;
