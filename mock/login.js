const sendJson = require('send-data/json')

function login(req, res) {
  let { username, password } = req.body
  if (username === 'admin' && password === '888888') {
    sendJson(req, res, {
      statusCode: 200,
      body: {
        id: 1,
        nickname: 'Jerry',
      },
    })
  } else {
    sendJson(req, res, {
      statusCode: 400,
      body: {
        code: 400,
        message: 'Invalid username or password',
      },
    })
  }
}

function logout(req, res) {
  sendJson(req, res, {})
}

function getCurrentUser(req, res) {
  sendJson(req, res, {
    statusCode: 200,
    body: {
      id: 1,
      nickname: 'Jerry',
    },
  })
}

module.exports = {
  'POST /api/login': login,
  'POST /api/logout': logout,
  'GET /api/current-user': getCurrentUser,
}
