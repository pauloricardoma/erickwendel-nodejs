const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do Heroi")

    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar um heroi")
    .option('-r, --remover [value]', "Remove um heroi pelo id")
    .option('-a, --atualizar [value]', "Atualizar um heroi pelo id")
    .parse(process.argv)

  const heroi = new Heroi(Commander._optionValues)

  try {
    if(Commander._optionValues.cadastrar) {
      delete heroi.id

      const result = await Database.cadastrar(heroi)
      if (!result) {
        console.error('Heroi não foi cadastrado!')
        return;
      }
      console.log('Heroi cadastrado com sucesso!')
    }

    if(Commander._optionValues.listar) {
      const result = await Database.listar()
      console.log(result)
      return
    }

    if(Commander._optionValues.remover) {
      const result = await Database.remover(heroi.id)
      if (!result) {
        console.error('Não foi possível remover o heroi!')
        return;
      }
      console.log('Heroi removido com sucesso!')
    }

    if(Commander._optionValues.atualizar) {
      const idParaAtualizar = parseInt(Commander._optionValues.atualizar)
      // remover todas as chave que estiverem com undefined | null
      const dado = JSON.stringify(heroi)
      const heroiAtualizar = JSON.parse(dado)
      const result = await Database.atualizar(idParaAtualizar, heroiAtualizar)
      if (!result) {
        console.error('Não foi possível atualizar o heroi')
      }
      console.log('Heroi atualizado com sucesso!')
    }

  } catch (error) {
    console.error('Deu ruim ', error)
  }
}
main()