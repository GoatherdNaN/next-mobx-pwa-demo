# next-mobx-pwa-demo
next v7结合mobx实现的PWA应用
## 前言
近日，Next团队发布了 Next.js 7.0，引入了Webpack4 和 Babel7，新增了增量编译缓存，号称开发过程中的启动速度可以提高了 57％，重新编译速度提高 42％,大幅度的性能改善，更好的错误报告机制，以及对App 和 Page 之间的 React Context，都让人跃跃欲试，现在手头项目在用mobx，所以这个demo用mobx作为状态管理器，引入workbox-webpack-plugin使得这也是个PWA应用。
## 技术栈
next7 + mobx + antd


## 使用说明
- 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```
$ npm install
```

- 启动服务器
```
$ npm run dev
```
然后你可以在localhost:3000查看效果

## 主要目录结构说明
```
├─.next # 编译后生成的所有代码、资源
├─components #  组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
├─lib # 
│   ├─next-less # @zeit/next-less源码，修改了部分以支持ant样式的按需加载和cssModules
│   └─with-mobx-store.js # 服务器端和浏览器端状态同步的文件
├─pages # 页面，对应到路由，具体参考next文档
├─static # 静态文件，包括图片、css之类
├─package.json # npm的配置文件
├─store # mobx状态管理，实现了按页面划分
├─utils # 工具文件夹，PWA的工具也在这里
├─next.config.js # next配置文件，包含了类webpack配置
├─theme.js # antd主题文件
└─server.js # 服务器代码
```
## 踩坑
1. 由于next-less处理样式是全局统一处理，如果开启cssModules，无法过滤掉部分样式，将导致ant样式引入进来无法生效，参考其他开发者的做法，基本上都是在Head中将样式用link引入，而无法实现按需引入，并且无法定制antd主题。  
目前，探索过的方案:

i. 查看@zeit/next-less的代码，发现它其实依赖于看@zeit/next-css来生成less的loader配置，所以：

```
// next.config.js
// 引入@zeit/next-css/css-loader-config
const getLessConfig = (cssModules=false, modifyVars=null) => {
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
```
ii. 改变cssModules的生成规则，过滤掉相关文件夹
    
    
```
const avoidPaths = ['node_modules/antd'].map(d => path.join(__dirname, d));

function canBeTransformed(pathToCheck) {
	return !avoidPaths.some(function(v) {
		const path = pathToCheck.substr(0, pathToCheck.lastIndexOf('/') + 1);
		return v.includes(path);
	});
}
...
withLess({
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
	}
})
```
这两个方案都可实现在next中，区别配置cssModules

2. 由于按需加载的缘故，导致初次加载之后，切换page,antd样式没有生效，查看编译文件，发现文件其实是编译了的，只不过HMR没有生效，这个暂时没有好的办法，只能等next-plugin后期更新能修复这个bug([Issues](https://github.com/zeit/next-plugins/issues/263))，目前探索过的做法：

i. 在入口中手动加入其他page
```
/**next.config.js，会连同其他页面的js一起加进来，是去了提高首屏加载速度的目的*/
config.entry = () =>
	oldEntry().then(entry => {
		entry['main.js'] &&
			entry['main.js'].push(
				path.resolve('./pages/other.js'),
				path.resolve('./utils/offline')
			);
		return entry
	})
```
ii. 手动在_app.js中加入需要用到的antd样式

```
<!--myAntd.less-->
@import "~antd/lib/menu/style/index.less";
@import "~antd/lib/carousel/style/index.less";
@import "~antd/lib/button/style/index.less";
<!--_app.js-->
import myAntd from '../static/css/myAntd.less';
...
<style global jsx>{myAntd}</style>
```
第二个方案可以花最小的代价实现需求，不过也不是真正的按需加载，只是比全局引入所有样式的方式好一些，不过每次使用一个新的antd组件,都要手动在myAntd.less引入相关样式才行，略麻烦
