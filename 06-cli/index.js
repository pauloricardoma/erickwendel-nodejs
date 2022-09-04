const Commander = require('commander')
const Database = require('./database')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")

    .option('-c, --cadastrar', "Cadastrar um hyeroi")
    .parse(process.argv)

  try {
    if(Commander.cadastrar) {
      console.log(Commander)
      // const result = await Database.cadastrar(Commander)
    }
  } catch (error) {
    console.error('Deu ruim ', error)
  }
}
main()