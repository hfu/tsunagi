const fs = require('fs')
const MBTiles = require('@mapbox/mbtiles')
const express = require('express')
const spdy = require('spdy')
const cors = require('cors')
const config = require('config')

const app = express()
app.use(cors())

let port = config.get('port')
if (process.argv.length === 3) {
  port = parseInt(process.argv[2])
}

app.get('/', (req, res, next) => {
  res.set('Content-Type', 'text/plain')
  res.send('hi')


spdy.createServer({
  key: fs.readFileSync(config.get('key')), 
  cert: fs.readFileSync(config.get('cert')),
  ca: fs.readFileSync(config.get('ca'))
}, app).listen(port, () => { })
