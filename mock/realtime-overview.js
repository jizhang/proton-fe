const url = require('url')
const _ = require('lodash')
const qs = require('qs')
const sendJson = require('send-data/json')

function parseQuery(req) {
  return qs.parse(url.parse(req.url).query)
}

function getRandomChart() {
  return _.times(30, () => _.random(1000, 2000) * _.random(0, 5))
}

const PAGE_SIZE = 6

const USER_ACQUISITION = {
  'First user source': [
    { key: 'google', value: 1777, percent: 0.9052 },
    { key: '(direct)', value: 173, percent: 0.0881 },
    { key: 'pbb.lviv.ua', value: 13, percent: 0.0066 },
  ],
  'First user medium': [],
  'First user source / medium': [
    { key: 'google / organic', value: 3547, percent: 0.8892 },
    { key: '(direct) / (none)', value: 288, percent: 0.0722 },
    { key: 'yandex.ru / referral', value: 50, percent: 0.0125 },
    { key: 'baidu / organic', value: 48, percent: 0.012 },
    { key: 'bing / organic', value: 31, percent: 0.0078 },
    { key: 'cn.bing.com / referral', value: 13, percent: 0.0033 },
    { key: 'duckduckgo / organic', value: 12, percent: 0.003 },
  ],
}

function getUserAcquisitionTop(req, res) {
  const { dimensionName } = parseQuery(req)
  let topData
  if (USER_ACQUISITION[dimensionName].length > 0) {
    topData = _.clone(USER_ACQUISITION[dimensionName][0])
    topData.chart = _.times(30, () => _.random(1000, 2000) * _.random(0, 5))
  } else {
    topData = {
      key: '-',
      value: 0,
      percent: 0,
      chart: [],
    }
  }
  sendJson(req, res, topData)
}

function getUserAcquisitionList(req, res) {
  const { dimensionName, page } = parseQuery(req)
  sendJson(req, res, {
    data: _.slice(USER_ACQUISITION[dimensionName], (page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: _.size(USER_ACQUISITION[dimensionName]),
  })
}

const AUDIENCE_DATA = [
  { key: 'All Users', value: 1166, percent: 0.8643 },
  { key: 'Purchasers', value: 183, percent: 0.1357 },
]

function getAudienceTop(req, res) {
  const payload = _.clone(AUDIENCE_DATA[0])
  payload.chart = getRandomChart()
  sendJson(req, res, payload)
}

function getAudienceList(req, res) {
  sendJson(req, res, {
    data: AUDIENCE_DATA,
    total: AUDIENCE_DATA.length,
  })
}

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

const EVENT_COUNT = [
  { key: 'page_view', value: 7844, percent: 0.2574 },
  { key: 'session_start', value: 7727, percent: 0.2535 },
  { key: 'user_engagement', value: 5914, percent: 0.1941 },
  { key: 'first_visit', value: 4231, percent: 0.1388 },
  { key: 'click', value: 2675, percent: 0.0878 },
  { key: 'scroll', value: 2086, percent: 0.0684 },
]

function getEventCountTop(req, res) {
  const payload = _.clone(EVENT_COUNT[0])
  payload.chart = getRandomChart()
  sendJson(req, res, payload)
}

function getEventCountList(req, res) {
  sendJson(req, res, {
    data: EVENT_COUNT,
    total: EVENT_COUNT.length,
  })
}

module.exports = {
  'GET /api/realtime-overview/user-acquisition/top': getUserAcquisitionTop,
  'GET /api/realtime-overview/user-acquisition/list': getUserAcquisitionList,
  'GET /api/realtime-overview/audience/top': getAudienceTop,
  'GET /api/realtime-overview/audience/list': getAudienceList,
  'GET /api/realtime-overview/views-by-page-title/top': getViewsByPageTitleTop,
  'GET /api/realtime-overview/views-by-page-title/list': getViewsByPageTitleList,
  'GET /api/realtime-overview/event-count/top': getEventCountTop,
  'GET /api/realtime-overview/event-count/list': getEventCountList,
}
