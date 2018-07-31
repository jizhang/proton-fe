const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.get('/api/dashboard/activeUser', (req, res) => {
  res.json({
    payload: {
      count: _.random(40000, 50000),
      minutes: _.times(30, () => _.random(10000, 20000)),
    }
  })
})

app.get('/api/dashboard/activeHourlyUsers', (req, res) => {
  let payload = []
  for (let day = 0; day < 7; ++day) {
    for (let hour = 23; hour >= 0; --hour) {
      payload.push({
        day,
        hour,
        users: _.random(100000, 200000),
      })
    }
  }
  res.json({ payload })
})

app.get('/api/dashboard/geoChina', (req, res) => {
  let content = fs.readFileSync(path.join(__dirname, 'geo-china.json'))
  let payload = JSON.parse(content)
  res.json({ payload })
})

const server = app.listen(3001, () => {
  console.log('mock server listening on port ' + server.address().port)
})
