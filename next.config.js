const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const withLess = require('./lib/next-less');
const theme = require('./theme');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLess({
	antdConfig: {
		withAntd: true,
		theme
	},
  webpack: (config, { buildId, dev }) => {
		const oldEntry = config.entry
		config.entry = () =>
			oldEntry().then(entry => {
				entry['main.js'] &&
					entry['main.js'].push(
						path.resolve('./pages/other.js'),
						path.resolve('./utils/offline')
					);
				return entry
			})

		/* Enable only in Production */
		if (!dev) {
			// Service Worker
			config.plugins.push(
				new WorkboxPlugin.InjectManifest({
					swSrc: path.join(__dirname, 'utils', 'sw.js'),
					swDest: path.join(__dirname, '.next', 'sw.js'),
					globDirectory: __dirname,
					globPatterns: [
						'static/**/*.{png,jpg,ico}' // Precache all static assets by default
					]
				})
			)
		}

		return config
	}
})