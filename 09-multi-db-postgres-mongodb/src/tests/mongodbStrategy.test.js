const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())
const MOCK_HEROI_CADASTRAR = { 
  nome: 'Hulk',
  poder: 'Força'
}
const MOCK_HEROI_DEFAULT = { 
  nome: `Wolverine-${new Date()}`,
  poder: 'Regeneração'
}
const MOCK_HEROI_ATUALIZAR = { 
  nome: `Patolino-${new Date()}`,
  poder: 'Inteligência'
}
let MOCK_HEROI_ID = ''

describe('MongoDB Strategy', function() {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    await context.connect()
    await context.create(MOCK_HEROI_DEFAULT)
    const result = await context.create(MOCK_HEROI_ATUALIZAR)
    MOCK_HEROI_ID = result._id;
  })
  it('MongoDB Connection', async function() {
    const result = await context.isConnected()
    const expected = 'Conectado'
    assert.equal(result, expected)
  })
  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
  })
  it('listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
    const result = { nome, poder }
    assert.deepEqual(result, MOCK_HEROI_DEFAULT)
  })
  it('atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Papa-léguas',
      poder: 'Velocidade'
    })
    console.log({result})
    assert.deepEqual(result.modifiedCount, 1)
  })
})