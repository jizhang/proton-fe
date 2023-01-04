module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    let { username, password } = req.body
    if (username === 'admin' && password === '888888') {
      res.json({
        payload: {
          id: 1,
          nickname: 'Jerry',
        },
      })
    } else {
      res.status(400).json({
        code: 400,
        payload: {
          message: 'invalid username or password',
        },
      })
    }
  })

  app.post('/api/logout', (req, res) => {
    res.json({
      payload: 'ok',
    })
  })
}
