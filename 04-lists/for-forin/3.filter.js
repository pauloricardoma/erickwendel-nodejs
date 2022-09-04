const { getPeoples } = require('./service')

/*
const item = {
  name: 'Erick',
  age: 12,
}

const { name, age } = item
console.log(name, age)
*/
Array.prototype.myfilter = function (callback) {
  const lista = []
  for (index in this) {
    const item = this[index]
    const result = callback(item, index, this)
    // 0, "", null, undefined === false
    if (!result) continue;
    lista.push(item)
  }
  return lista;
}

async function main() {
  try {
    const {
      results
    } = await getPeoples(`a`)

    // const larsFamily = results.filter(function (item) {
    //   // por padrão precisa retornar um booleano
    //   // para informar se deve manter ou remover da lista
    //   // false -> remove da lista
    //   // true -> mantem
    //   // não encontrou = -1
    //   // econtrou = posicaoNoArray
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1
    //   return result
    // })
    const larsFamily = results.myfilter((item, index, lista) => {
      console.log(`index: ${index}, ${lista.length}`)
      return item.name.toLowerCase().indexOf('lars') !== -1
    })

    const names = larsFamily.map((pessoa) => pessoa.name)
    console.log(names)
    
  } catch (error) {
    console.error('Deu ruim', error)
  }
}
main()