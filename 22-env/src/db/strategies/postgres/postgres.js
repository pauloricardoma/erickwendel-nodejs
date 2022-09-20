const ICrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
  constructor(connection, schema) {
    super()
    this._connection = connection
    this._schema = schema
  }
  async isConnected() {
    try {
      await this._connection.authenticate()
      return true
    } catch (error) {
      console.log('Fail!', error)
      return false
    }
  }
  async create(item) {
    const {
      dataValues
    } = await this._schema.create(item)

    return dataValues
  }
  update(id, item, upsert = false) {
    const fn = upsert ? 'upsert' : 'update'

    return this._schema[fn](item, { where: { id: id }})
  }
  delete(id) {
    const query = id ? { id } : {}
    return this._schema.destroy({ where: query })
  }
  read(item = {}) {
    return this._schema.findAll({ where: item, raw: true })
  }
  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options
    )
    await model.sync()
    return model
  }
  static connect() {
    const connection = new Sequelize(
      'heroes',
      'pauloricardoma',
      'root',
      {
        host: 'localhost', //devido ao docker neste caso
        dialect: 'postgres',
        quoteIdentifiers: false, //ignorar case sensitive
        operatorAliases: false, // erros de deprecade ignorados
        omitNull: false, //necessário para resolver id auto increment
        logging: false, // ignorar o log de manipulacoes no bd
      }
    )
    return connection
  }
}
module.exports = Postgres
