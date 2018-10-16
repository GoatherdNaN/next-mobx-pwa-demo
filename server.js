const { createServer } = require('http')
// const fs = require('fs')
const path = require('path')
const next = require('next')
const { parse } = require('url')

// const manifest = path.resolve(__dirname,".next/build-manifest.json")
// const Head = path.resolve(__dirname,"components/Head/index.js")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare().then(_ => {
	const server = createServer((req, res) => {
		if (req.url === '/sw.js' || req.url.startsWith('/precache-manifest')) {
			app.serveStatic(req, res, path.join(__dirname, '.next', req.url))
		} else {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
		}
	})

	server.listen(PORT, err => {
		if (err) throw err

		// fs.stat(manifest,function(err,stat){
		// 	if(stat){
		// 		fs.watchFile(manifest,() => {
		// 			fs.readFile(Head,{encoding:"utf-8"},(err,data) => {
		// 				const str = data.toString.replace(/\{\/\*styles\.chunk\.css\*\/\}/,`<link rel='stylesheet' type='text/css' href='/_next/static/css/styles.chunk.css?v=${new Date().getTime()}' />`)
		// 				fs.writeFile(Head,str,'utf-8');
		// 			})
		// 		}) 
		// 	}
		// })

		console.log(`> App running on port ${PORT}`)
	})
})