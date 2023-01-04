const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

require('./login')(app)
require('./dashboard')(app)

const server = app.listen(3001, () => {
  console.log('mock server listening on port ' + server.address().port)
})
