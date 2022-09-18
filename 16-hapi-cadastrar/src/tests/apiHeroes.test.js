const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin',
  poder: 'Marreta'
}

describe('Suite de testes da API Heroes', function() {
  this.beforeAll(async () => {
    app = await api
  })

  it('listar GET - /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
  })
  it('listar GET - /herois - deve retornar somente 3 registros', async () => {
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
  it('listar GET - /herois - deve retornar um erro com limit incorreto', async () => {
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
    
    assert.ok(result.statusCode === 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))
  })
  it('listar GET - /herois - deve filtrar um item', async () => {
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

  it('cadastrar POST - /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      payload: MOCK_HEROI_CADASTRAR
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.notStrictEqual(_id, undefined)
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
  })
})