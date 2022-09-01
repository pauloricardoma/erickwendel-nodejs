const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function getPeoples(name) {
  const url = `${URL}/?search=${name}`
  const response = await axios.get(url)
  return response.data
}

module.exports = {
  getPeoples
}