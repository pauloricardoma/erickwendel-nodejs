const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Green Lantern',
  poder: 'Energy Ring',
  id: 2
}

describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
  })
  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    // usando destructuring entre chaves, pegando posições do array [0]
    const [result] = await database.listar(expected.id)

    deepEqual(result, expected)
  })
  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

    deepEqual(actual, expected)
  })
  it('deve remover um heroi por id', async () => {
    const expected = true
    const result = await database.remover(DEFAULT_ITEM_CADASTRAR.id)

    deepEqual(result, expected)
  })
  it('deve atualizar um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
    const [result] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
    deepEqual(result, expected)
  })
})
