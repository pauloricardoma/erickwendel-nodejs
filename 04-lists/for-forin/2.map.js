const service = require('./service')

Array.prototype.myMap = function(callback) {
  const newArrayMap = []
  for (let index = 0; index <= this.length - 1; index++) {
    const result = callback(this[index], index)
    newArrayMap.push(result)
  }

  return newArrayMap;
}

async function main() {
  try {
    const result = await service.getPeoples(`a`)
    // const names = []
    // console.time('forEach')
    // result.results.forEach(function (item) {
    //   names.push(item.name)
    // })
    // console.timeEnd('forEach')
    // console.time('map')
    // // const namesMap = result.results.map(function (item) {
    // //   return item.name
    // // })
    // const namesMap = result.results.map((item) => item.name)
    // console.timeEnd('map')
    // console.log('names: ',names)
    // console.log('names: ',namesMap)
    console.time('myMap')
    const names = result.results.myMap(function (people, index) {
      return `[${index}]${people.name}`
    })
    console.timeEnd('myMap')
    console.log('names: ',names)
  } catch (error) {
    console.error('Deu ruim!', error)
  }
}
main()