const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { 
  nome: 'Gavião Negro',
  poder: 'Flexas'
}
const MOCK_HEROI_ATUALIZAR = { 
  nome: 'Superman',
  poder: 'Super Força, Voar'
}

describe('Postgres Strategy', function() {
  this.timeout(Infinity)
  this.beforeAll(async function() {
    await context.connect()
    await context.create(MOCK_HEROI_ATUALIZAR)
  })
  it('PostgresSQL Connection', async function() {
    const result = await context.isConnected()
    assert.equal(result, true)
  })
  it('cadastrar', async function() {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
  it('listar', async function() {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    delete result.id
    // pegar a primeira posicao
    // const posicaoZero = result[0]
    // const [posicao1, posicao2] = ['esse e o 1', 'esse e o 2']
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
  it('atualizar', async function() {
    const [result] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
    const newItem = {
      ...MOCK_HEROI_ATUALIZAR,
      
    }
  })
})