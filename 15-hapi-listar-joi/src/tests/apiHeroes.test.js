const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Suite de testes da API Heroes', function() {
  this.beforeAll(async () => {
    app = await api
  })

  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
  })
  it('listar /herois - deve retornar somente 3 registros', async () => {
    const LIMIT_LENGTH = 3
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${LIMIT_LENGTH}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.length === LIMIT_LENGTH)
  })
  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const LIMIT_LENGTH = 'opa'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${LIMIT_LENGTH}`
    })
    const errorResult = {
      "statusCode":400,
      "error":"Bad Request",
      "message":"\"limit\" must be a number",
      "validation":{
        "source":"query",
        "keys":["limit"]
      }
    }
    
    assert.deepEqual(result.statusCode, 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))
  })
  it('listar /herois - deve filtrar um item', async () => {
    const NAME = 'Wolverine-Sun Sep 11 2022 02:46:01 GMT-0300 (Brasilia Standard Time)'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=1000&nome=${NAME}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(dados[0].nome, NAME)
  })
})