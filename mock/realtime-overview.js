const url = require('url')
const _ = require('lodash')
const qs = require('qs')
const sendJson = require('send-data/json')

const PAGE_TITLES = [
  { key: 'RESTful API Authentication with Spring Security', value: 1512, percent: 0.3883 },
  { key: 'Configure Git Line Endings Across OSes', value: 1054, percent: 0.2707 },
  { key: 'Setup CI with GitHub Actions (Java/Node/Python)', value: 772, percent: 0.1983 },
  { key: 'Mock API in Parcel Project', value: 274, percent: 0.0704 },
  { key: 'Configure Logging for Flask SQLAlchemy Project', value: 154, percent: 0.0395 },
  { key: 'Use Composition API and Pinia in Vue 2 Project', value: 100, percent: 0.0257 },
  { key: 'Add TypeScript Support to Vue 2 Project', value: 20, percent: 0.0051 },
  { key: 'Manage Multiple CommandLineRunner in Spring Boot', value: 8, percent: 0.0021 },
]

function getViewsByPageTitleTop(req, res) {
  const payload = _.clone(PAGE_TITLES[0])
  payload.chart = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))
  sendJson(req, res, payload)
}

function getViewsByPageTitleList(req, res) {
  const query = qs.parse(url.parse(req.url).query)
  const page = _.get(query, 'page', 1)
  const size = 6
  sendJson(req, res, {
    data: _.slice(PAGE_TITLES, (page - 1) * size, page * size),
    total: _.size(PAGE_TITLES),
  })
}

module.exports = {
  'GET /api/realtime-overview/views-by-page-title/top': getViewsByPageTitleTop,
  'GET /api/realtime-overview/views-by-page-title/list': getViewsByPageTitleList,
}
