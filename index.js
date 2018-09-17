const fs = require('fs')
const zlib = require('zlib')
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

const style = JSON.parse(fs.readFileSync(config.get('style')))
let root = style
root.sprite = '../sprites/sprite'
root.glyphs = '../fonts/{fontstack}/{range}.pbf'
root.sources = { esri: { type: 'vector', url: '../../' } }

const sprite_png = fs.readFileSync(config.get('sprite') + '.png')
const sprite_json = fs.readFileSync(config.get('sprite') + '.json')

let mbtiles
new MBTiles(`${config.get('mbtiles')}?mode=ro`, (err, mbt) => {
  if (err) throw err
  mbtiles = mbt
})

app.get('/', (req, res, next) => {
  res.set('Content-Type', 'text/plain')
  res.send('hi')
})

app.get(`${service_url}`, (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.send(fs.readFileSync(config.get('resource')))
})

app.get(`${service_url}/resources/styles/root.json`, (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify(root, null, 2))
})

app.get(`${service_url}/resources/sprites/sprite.json`, (req, res, next) => {
  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify(sprite_json, null, 2))
})

app.get(`${service_url}/resources/sprites/sprite.png`, (req, res, next) => {
  res.set('Content-Type', 'image/png')
  res.send(sprite_png)
})

app.get(`${service_url}/tile/:z/:y/:x.pbf`, async (req, res, next) => {
  res.set('Content-Type', 'application/vnd.mapbox-vector-tile')
  res.set('Content-Encoding', 'gzip')
  let tile = await new Promise((resolve, reject) => {
    mbtiles.getTile(Number(req.params.z), Number(req.params.x), Number(req.params.y), 
      (err, data, headers) => {
      if (err) {
        resolve(false)
      } else {
        resolve(data)
      }
    })
  })
  res.send(tile)
})

async function main() {
  spdy.createServer({
    key: fs.readFileSync(config.get('key')), 
    cert: fs.readFileSync(config.get('cert')),
    ca: fs.readFileSync(config.get('ca'))
  }, app).listen(port, () => { })
}
main()
