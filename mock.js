const _ = require('lodash')
const express = require('express')
const app = express()

app.get('/api/dashboard/activeUser', (req, res) => {
  res.json({
    payload: {
      count: _.random(50000),
    }
  })
})

const server = app.listen(3001, () => {
  console.log('mock server listening on port ' + server.address().port)
})
