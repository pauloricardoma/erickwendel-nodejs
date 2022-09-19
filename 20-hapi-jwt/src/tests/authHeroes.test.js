const assert = require('assert')
const api = require('../api')
let app = {}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTY2MzU1MTg1N30.Ffu-iE35SYmioOW7X_yoNT8CrSaFZEFLDEf8nycz7tw'

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'Xuxadasilva',
        password: '123'
      }
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.token.length > 10)
  })
})