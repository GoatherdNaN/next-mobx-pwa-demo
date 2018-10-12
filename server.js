const { createServer } = require('http')
const path = require('path')
const next = require('next')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
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

		console.log(`> App running on port ${PORT}`)
	})
})