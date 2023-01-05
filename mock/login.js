const sendJson = require('send-data/json')

function login(req, res) {
  let { username, password } = req.body
  if (username === 'admin' && password === '888888') {
    sendJson(req, res, {
      payload: {
        id: 1,
        nickname: 'Jerry',
      },
    })
  } else {
    res.statusCode = 400
    sendJson(req, res, {
      code: 400,
      payload: {
        message: 'invalid username or password',
      },
    })
  }
}

function logout(req, res) {
  sendJson(req, res, {
    payload: 'ok',
  })
}

module.exports = {
  'POST /api/login': login,
  'POST /api/logout': logout,
}
