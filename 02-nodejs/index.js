/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario Id
*/
// importamos o módulo interno do node.js
const util = require('util')
const getAddressAsync = util.promisify(getAddress)

function getUser(callback) {
  // quando der algum problema -> reject(ERRO)
  // quando der sucesso -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('Deu ruim de verdade!!!'))

      return resolve({
        id: 1,
        name: 'Aladin',
        birthday: new Date()
      })
    }, 1000)
  })
}

function getPhone(idUser) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        phone: '999999999',
        ddd: 11
      })
    }, 2000)
  })
}

function getAddress(idUser, callback) {
  setTimeout(function () {
    return callback(null, {
      street: 'dos bobos',
      number: 0
    })
  }, 2000)
}

// 1º passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')
    const user = await getUser()
    // const phone = await getPhone(user.id)
    // const address = await getAddressAsync(user.id)
    const result = await Promise.all([
      getPhone(user.id),
      getAddressAsync(user.id)
    ])
    const address = result[1]
    const phone = result[0]
    console.log(`
      Name: ${user.name}
      Address: ${address.street}, ${address.number}
      Phone: (${phone.ddd}) ${phone.phone}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('Deu ruim', error)
  }
}

// const userPromise = getUser()
// // para manipular o sucesso, usamos a função .then()
// // para manipular erros, usamos o  .catch()
// // user -> phone -> phone
// userPromise
//   .then(function (user) {
//     return getPhone(user.id)
//       .then(function resolvePhone(result) {
//         return {
//           user: {
//             name: user.name,
//             id: user.id
//           },
//           phone: result
//         }
//       })
//   })
//   .then(function (result) {
//     const address = getAddressAsync(result.user.id)
//     return address.then(function resolveAddress(resultAddress) {
//       return {
//         user: result.user,
//         phone: result.phone,
//         address: resultAddress
//       }
//     })
//   })
//   .then(function (result) {
//     console.log(`
//       Name: ${result.user.name}
//       Address: ${result.address.street}, ${result.address.number}
//       Phone: (${result.phone.ddd}) ${result.phone.phone}
//     `)
//   })
//   .catch(function (error) {
//     console.error('Deu ruim', error)
//   })

// getUser(function resolveUser(error, user) {
//   if(error) {
//     console.error('Deu ruim em USER', error)
//     return;
//   }
//   getPhone(user.id, function resolvePhone(error1, phone) {
//     if(error1) {
//       console.error('Deu ruim em PHONE', error1)
//       return;
//     }
//     getAddress(user.id, function resolveAdress(error2, address) {
//       if(error2) {
//         console.error('Deu ruim em ADDRESS', error2)
//         return;
//       }

//       console.log(`
//         Name: ${user.name}
//         Address: ${address.street}, ${address.number}
//         Phone: (${phone.ddd}) ${phone.phone}
//       `)
//     })
//   })
// })