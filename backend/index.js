const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')
// MongoClass呼び出し
const mongoClass = require('./classes/mongo.js')
const mongoItem = new mongoClass(mongoClient)
// chokidar呼び出し
const chokidar = require('chokidar')
const chokidarClass = require('./classes/chokidar.js')
let chokidarItem = new chokidarClass(chokidar, './test', mongoItem)

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/test', function(req, res) {
  const list = [
    {
      message: 'Hello world!',
      item: 'aiueo'
    },{
      message: 'こんにちは、世界',
      item: 'kakiku'
    }
  ]
  res.send(list)
})

app.post('/test', function(req, res) {
    res.send({
      message: req.body.text
    })
  })

app.listen(process.env.PORT || 3000)