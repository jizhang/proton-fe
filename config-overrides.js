const rewireLess = require('react-app-rewire-less')
const rewireMobX = require('react-app-rewire-mobx')

module.exports = function override(config, env) {
  config = rewireLess(config, env)
  config = rewireMobX(config, env)
  return config
}
