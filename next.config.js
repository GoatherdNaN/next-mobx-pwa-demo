const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
// const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const withLess = require('@zeit/next-less')
const theme = require('./theme')

// let extractCssInitialized = false

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

const avoidPaths = ['node_modules/antd'].map(d => path.join(__dirname, d));

function canBeTransformed(pathToCheck) {
	return !avoidPaths.some(function(v) {
		const path = pathToCheck.substr(0, pathToCheck.lastIndexOf('/') + 1);
		return v.includes(path);
	});
}
//---------------------注释的这个方案也能实行区别cssModules
// const getLessConfig = (cssModules=true, modifyVars=null)	=> {
// 			const options = { javascriptEnabled: true };
// 			!!modifyVars && (options.modifyVars = modifyVars);
// 			return cssLoaderConfig(config, {
//         extensions: ['less'],
//         cssModules,
//         dev,
//         isServer,
//         loaders: [{
// 					loader: 'less-loader',
// 					options
// 				}]
//       })
// 		}
		
// 		config.module.rules.push({
// 			test: /\.less$/,
// 			exclude: path.resolve(__dirname,"node_modules"), // node_modules以外的启用cssModules
// 			use: getLessConfig()
// 		},{
// 			test: /\.less$/,
// 			include: path.resolve(__dirname,"node_modules/antd/lib"), // antd的样式启用cssModules
// 			use: getLessConfig(false,theme)
// 		})

module.exports =  withLess({
	cssModules: true,
	lessLoaderOptions: {
		javascriptEnabled: true,
		modifyVars: theme
	},
	cssLoaderOptions: {
		getLocalIdent: (loaderContext, localIdentName, localName, options) => {
			const fileName = path.basename(loaderContext.resourcePath)
			const shoudTransform = canBeTransformed(loaderContext.resourcePath)

			if(!shoudTransform){
				return localName
			}else{
				const name = fileName.replace(/\.[^/.]+$/, "")
				const suffix = name.substring(name.lastIndexOf("_") + 1);
				if(suffix === "module") {
						return `${name}___${localName}`
				} else {
						return localName
				}
			}
		}
	},
	webpack: (config, {dev}) => {
		const oldEntry = config.entry
		config.entry = () =>
			oldEntry().then(entry => {
				entry['main.js'] &&
					entry['main.js'].push(
						// path.resolve('./pages/other'),
						path.resolve('./utils/offline')
					);
				return entry
			})
		if (!dev) {
			// Service Worker
			config.plugins.push(
				new WorkboxPlugin.InjectManifest({
					swSrc: path.join(__dirname, 'utils', 'sw.js'),
					swDest: path.join(__dirname, '.next', 'sw.js'),
					globDirectory: __dirname,
					globPatterns: [
						'static/**/*.{png,jpg,ico}' 
					]
				})
			)
		}

		return config
	}
})