const EventEmitter = require('events')
class MyEmitter extends EventEmitter {

}
const myEmitter = new MyEmitter()
const eventName = 'user:click'
myEmitter.on(eventName, function (click) {
  console.log('um usuario clicou', click)
})

// myEmitter.emit(eventName, 'na barra de rolagem')
// myEmitter.emit(eventName, 'no ok')

// let count = 0
// setInterval(function () {
//   myEmitter.emit(eventName, 'no ok' + (count ++))
// }, 1000)

// const stdin = process.openStdin()
// stdin.addListener('data', function (value) {
//   console.log(`Voce digitou: ${value.toString().trim()}`)
// })

const stdin = process.openStdin()
function main() {
  return new Promise(function (resolve, reject) {
    stdin.addListener('data', function (value) {
      // console.log(`Voce digitou: ${value.toString().trim()}`)
      return resolve(value)
    })
  })
}
main().then(function (result) {
  console.log('Result: ', result.toString())
})