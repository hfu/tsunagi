# tsunagi
(reserved) the next of [kaeshi](https://github.com/hfu/kaeshi). 

## Background
I need to provide ArcGIS Server Web Service interface for OSS-based vector tiles.

## Install
```console
$ git clone git@github.com:hfu/tsunagi
$ cd tsunagi
$ npm install
```

## Usage
```console
$ mkdir config
$ vi config/default.json
$ node index.js
```
## config/default.hjson
```
{
  key: somewhere/privkey.pem
  cert: somewhere/fullchain.pem
  ca: somewhere/chain.pem
  port: 8808
  name: OpenStreetMap_v2
  resource: resource.json
  style: somewhere/style.json
  mbtiles: somewhere/some.mbtiles
}
```
