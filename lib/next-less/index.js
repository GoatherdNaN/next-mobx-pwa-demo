/**
 * Mender: edlan
 * I modified it on "@zeit/next-less",you can check it.http://npm.taobao.org/package/less-loader
 */
const path = require("path");
const cssLoaderConfig = require('./css-loader-config')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        antdConfig = {},
        lessLoaderOptions = {
          javascriptEnabled: true
        }
      } = nextConfig

      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules: (!!antdConfig.withAntd) || cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      })

      const lessLoaderConfig = {
        test: /\.less$/,
        use: options.defaultLoaders.less
      };

      if(!!antdConfig.withAntd) {
        lessLoaderConfig.exclude = /node_modules/;
        config.module.rules.push({
          test: /\.less$/,
          include: path.resolve("./node_modules/antd/lib"),
          use: cssLoaderConfig(config, {
            extensions: ['less'],
            cssModules: false,
            cssLoaderOptions,
            postcssLoaderOptions,
            dev,
            isServer,
            loaders: [
              {
                loader: 'less-loader',
                options: {
                  ...lessLoaderOptions,
                  modifyVars: antdConfig.theme
                }
              }
            ]
          })
        })
      }

      config.module.rules.push(lessLoaderConfig)

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }


      return config
    }
  })
}
