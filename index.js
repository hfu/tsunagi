const fs = require('fs')
const MBTiles = require('@mapbox/mbtiles')
const express = require('express')
const spdy = require('spdy')
const cors = require('cors')
const config = require('config')
const service_url = `/arcgis/rest/services/${config.get('name')}/VectorTileServer`

const app = express()
app.use(cors())

let port = config.get('port')
if (process.argv.length === 3) {
  port = parseInt(process.argv[2])
}

app.get('/', (req, res, next) => {
  res.set('Content-Type', 'text/plain')
  res.send('hi')
})

app.get(`${service_url}`, (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify({
    currentVersion: 10.61,
    capabilities: 'TilesOnly,TileMap',
    type: 'vector',
    defaultStyles: 'resources/styles',
    tiles: ['tile/{z}/{y}/{x}.pbf']
  }, null, 2))
})

spdy.createServer({
  key: fs.readFileSync(config.get('key')), 
  cert: fs.readFileSync(config.get('cert')),
  ca: fs.readFileSync(config.get('ca'))
}, app).listen(port, () => { })
