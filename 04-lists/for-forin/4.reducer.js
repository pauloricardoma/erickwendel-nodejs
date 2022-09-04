const { getPeoples } = require('./service')

Array.prototype.myReduce = function (callback, startValue) {
  let lastValue = typeof startValue !== undefined ? startValue : this[0]
  for (let index = 0; index <= this.length -1; index++) {
    lastValue = callback(lastValue, this[index], this)
  }
  return lastValue;
}

async function main() {
  try {
    const { results } = await getPeoples(`a`)
    const heights = results.map(item => parseInt(item.height))
    // console.log('heights', heights)
    // const total = heights.reduce((anterior, proximo) => {
    //   return anterior + proximo
    // }, 0)
    const myList = [
      ['Erick', 'Wendel'],
      ['NodeBR', 'Nerdzão']
    ]
    const total = myList.myReduce((anterior, proximo) => {
      return anterior.concat(proximo)
    }, []).join(', ')

    console.log('total', total)

  } catch (error) {
    console.error('Deu ruim', error)
  }
}
main()