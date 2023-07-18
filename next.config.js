/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'testbucketfp.s3.amazonaws.com'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'lh4.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'lh5.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'lh6.googleusercontent.com'
			}
		]
	}
}

module.exports = nextConfig
