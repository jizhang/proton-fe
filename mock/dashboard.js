const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const moment = require('moment')
const sendJson = require('send-data/json')

function getActiveUser(req, res) {
  sendJson(req, res, {
    count: _.random(40000, 50000),
    minutes: _.times(30, () => _.random(10000, 20000)),
  })
}

function getActiveHourlyUsers(req, res) {
  const startDate = moment().startOf('day').subtract(7, 'days')
  const data = _.times(7 * 24, (i) => {
    return {
      report_hour: moment(startDate).add(i, 'hours').format('YYYY-MM-DD HH:00:00'),
      user_count: _.random(10000, 20000),
    }
  })
  sendJson(req, res, { data })
}

function getGeoChinaData() {
  let content = fs.readFileSync(path.join(__dirname, 'geo-china.json'))
  let data = JSON.parse(content)
  return data
}

function getGeoChina(req, res) {
  sendJson(req, res, getGeoChinaData())
}

function getUserGeo(req, res) {
  let province = _.map(getGeoChinaData(), (item) => {
    return {
      name: item.properties.name,
      value: _.random(5000, 20000),
    }
  })

  sendJson(req, res, {
    province,
  })
}

function getPrimaryData(req, res) {
  const days = 14

  let users = {
    name: 'users',
    label: 'Users',
    format: 'integer',
    data: _.times(days, (i) => {
      const date = moment().subtract(days - i, 'days')
      const previousDate = moment(date).subtract(days, 'days')
      return {
        date: date.format('YYYY-MM-DD'),
        current: _.random(100000, 200000),
        previous: _.random(100000, 200000),
        previousDate: previousDate.format('YYYY-MM-DD'),
      }
    }),
  }

  let sessions = {
    name: 'session',
    label: 'Sessions',
    format: 'integer',
    data: _.times(14, (i) => {
      const date = moment().subtract(days - i, 'days')
      const previousDate = moment(date).subtract(days, 'days')
      return {
        date: date.format('YYYY-MM-DD'),
        current: _.random(200000, 400000),
        previous: _.random(200000, 400000),
        previousDate: previousDate.format('YYYY-MM-DD'),
      }
    }),
  }

  let bounceRate = {
    name: 'bounce_rate',
    label: 'Bounce Rate',
    format: 'percent',
    data: _.times(14, (i) => {
      const date = moment().subtract(days - i, 'days')
      const previousDate = moment(date).subtract(days, 'days')
      return {
        date: date.format('YYYY-MM-DD'),
        current: _.random(0.8, 0.9, true),
        previous: _.random(0.8, 0.9, true),
        previousDate: previousDate.format('YYYY-MM-DD'),
      }
    }),
  }

  let sessionDuration = {
    name: 'session_duration',
    label: 'Session Duration',
    format: 'interval',
    data: _.times(14, (i) => {
      const date = moment().subtract(days - i, 'days')
      const previousDate = moment(date).subtract(days, 'days')
      return {
        date: date.format('YYYY-MM-DD'),
        current: _.random(300, 600),
        previous: _.random(300, 600),
        previousDate: previousDate.format('YYYY-MM-DD'),
      }
    }),
  }

  sendJson(req, res, {
    statusCode: 200,
    body: {
      measures: [users, sessions, bounceRate, sessionDuration],
    },
  })
}

function getUserSource(req, res) {
  let trafficChannel = {
    name: 'traffic_channel',
    label: 'Traffic Channel',
    data: _.flatMap(_.range(7, 0, -1), (i) => {
      let date = moment().subtract(i, 'days').format('YYYY-MM-DD')
      return _.map(['Organic Search', 'Direct', 'Referral'], (key) => {
        return {
          date,
          key,
          value: _.random(5000, 10000),
        }
      })
    }),
  }

  let sourceMedium = {
    name: 'source_medium',
    label: 'Source / Medium',
    data: _.flatMap(_.range(7, 0, -1), (i) => {
      let date = moment().subtract(i, 'days').format('YYYY-MM-DD')
      return _.map(['google / organic', '(direct) / (none)', 'pbb.lviv.ua / referral'], (key) => {
        return {
          date,
          key,
          value: _.random(5000, 10000),
        }
      })
    }),
  }

  let referrals = {
    name: 'referrals',
    label: 'Referrals',
    data: _.flatMap(_.range(7, 0, -1), (i) => {
      let date = moment().subtract(i, 'days').format('YYYY-MM-DD')
      return _.map(['pbb.lviv.ua', 'we-ping-for-youeed.info', 'earn-moneyen.info'], (key) => {
        return {
          date,
          key,
          value: _.random(5000, 10000),
        }
      })
    }),
  }

  sendJson(req, res, {
    measures: [trafficChannel, sourceMedium, referrals],
  })
}

function getUserDevice(req, res) {
  let devices = [
    {
      name: 'iphone',
      label: 'iPhone',
      current: _.random(150000, 200000),
      previous: _.random(150000, 200000),
    },
    {
      name: 'ipad',
      label: 'iPad',
      current: _.random(10000, 20000),
      previous: _.random(10000, 20000),
    },
  ]

  sendJson(req, res, {
    devices,
  })
}

function getUserRetention(req, res) {
  let date = moment().startOf('isoWeek')
  let retention = _.times(6, (i) => {
    let startDate = moment(date).subtract(6 - i, 'weeks')
    let endDate = moment(startDate).add(6, 'days')
    return {
      week: `${startDate.format('M.D')} - ${endDate.format('M.D')}`,
      data: _.times(6, (j) => {
        if (j === 0) {
          return 1
        }
        if (j >= 6 - i) {
          return 0
        }
        return _.random(0, 1, true)
      }),
    }
  })

  sendJson(req, res, {
    retention,
  })
}

module.exports = {
  'GET /api/dashboard/activeUser': getActiveUser,
  'GET /api/dashboard/activeHourlyUsers': getActiveHourlyUsers,
  'GET /api/dashboard/geoChina': getGeoChina,
  'GET /api/dashboard/userGeo': getUserGeo,
  'GET /api/dashboard/primaryData': getPrimaryData,
  'GET /api/dashboard/userSource': getUserSource,
  'GET /api/dashboard/userDevice': getUserDevice,
  'GET /api/dashboard/userRetention': getUserRetention,
}
