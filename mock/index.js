const fs = require('fs')
const path = require('path')

const _ = require('lodash')
const moment = require('moment')
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

function getGeoChina() {
  let content = fs.readFileSync(path.join(__dirname, 'geo-china.json'))
  let payload = JSON.parse(content)
  return payload
}

app.get('/api/dashboard/geoChina', (req, res) => {
  res.json({
    payload: getGeoChina(),
  })
})

app.get('/api/dashboard/userGeo', (req, res) => {
  let province = _.map(getGeoChina(), item => {
    return {
      name: item.properties.name,
      value: _.random(5000, 20000),
    }
  })

  res.json({
    payload: {
      province,
    },
  })
})

app.get('/api/dashboard/primaryData', (req, res) => {
  let users = {
    name: 'users',
    label: 'Users',
    format: 'integer',
    data: _.times(14, i => {
      return {
        date: moment().subtract(14 - i, 'days').format('YYYY-MM-DD'),
        current: _.random(100000, 200000),
        previous: _.random(100000, 200000),
      }
    }),
  }

  let sessions = {
    name: 'session',
    label: 'Sessions',
    format: 'integer',
    data: _.times(14, i => {
      return {
        date: moment().subtract(14 - i, 'days').format('YYYY-MM-DD'),
        current: _.random(200000, 400000),
        previous: _.random(200000, 400000),
      }
    }),
  }

  let bounceRate = {
    name: 'bounce_rate',
    label: 'Bounce Rate',
    format: 'percent',
    data: _.times(14, i => {
      return {
        date: moment().subtract(14 - i, 'days').format('YYYY-MM-DD'),
        current: _.random(0.8, 0.9, true),
        previous: _.random(0.8, 0.9, true),
      }
    }),
  }

  let sessionDuration = {
    name: 'session_duration',
    label: 'Session Duration',
    format: 'interval',
    data: _.times(14, i => {
      return {
        date: moment().subtract(14 - i, 'days').format('YYYY-MM-DD'),
        current: _.random(300, 600),
        previous: _.random(300, 600),
      }
    }),
  }

  res.json({
    payload: {
      measures: [
        users,
        sessions,
        bounceRate,
        sessionDuration,
      ],
    },
  })
})

const server = app.listen(3001, () => {
  console.log('mock server listening on port ' + server.address().port)
})
