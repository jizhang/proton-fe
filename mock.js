const _ = require('lodash')
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

const server = app.listen(3001, () => {
  console.log('mock server listening on port ' + server.address().port)
})
