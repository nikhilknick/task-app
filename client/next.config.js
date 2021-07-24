module.exports = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/signin',
				permanent: true,
			},
		];
	},
};
