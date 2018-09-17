# tsunagi
A simplest possible ArcGIS Server Web Service for OSS-based vector tiles.

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
  resource: somewhere/resource.json
  style: somewhere/style.json
  sprite: somewhere/sprite
  mbtiles: somewhere/some.mbtiles
}
```

## See also
- [kaeshi](https://github.com/hfu/kaeshi): A simplest possible ArcGIS Server Web Service as a proxy. The earlier version. tsunagi no longer proxies existing ArcGIS Server.
