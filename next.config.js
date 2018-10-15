const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const theme = require('./theme')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports =  {
	webpack: (config, {dev,isServer}) => {
		const oldEntry = config.entry
		config.entry = () =>
			oldEntry().then(entry => {
				entry['main.js'] &&
					entry['main.js'].push(
						path.resolve('./pages/other'),
						path.resolve('./utils/offline')
					);
				return entry
			})

		const getLessConfig = (cssModules=false, modifyVars=null)	=> {
			const options = { javascriptEnabled: true };
			!!modifyVars && (options.modifyVars = modifyVars);
			return cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        dev,
        isServer,
        loaders: [{
					loader: 'less-loader',
					options: {
						javascriptEnabled: true
					}
				}]
      })
		}
		
		config.module.rules.push({
			test: /\.less$/,
			exclude: path.resolve(__dirname,"node_modules"), // node_modules以外的启用cssModules
			use: getLessConfig(true)
		},{
			test: /\.less$/,
			include: path.resolve(__dirname,"node_modules/antd/lib"), // antd的样式启用cssModules
			use: getLessConfig(false,theme)
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
}