import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'cdn-bucket.hb.ru-msk.vkcs.cloud' }
		]
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		}
	}
};

export default nextConfig;
