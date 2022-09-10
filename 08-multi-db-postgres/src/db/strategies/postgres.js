const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null
  }
  async isConnected() {
    try {
      await this._driver.authenticate()
      return true
    } catch (error) {
      console.log('Fail!', error)
      return false
    }
  }
  async create(item) {
    const {
      dataValues
    } = await this._herois.create(item)

    return dataValues
  }
  update(id, item) {
    return this._herois.update(item, { where: { id: id }})
  }
  delete(id) {
    const query = id ? { id } : {}
    return this._herois.destroy({ where: query })
  }
  read(item = {}) {
    return this._herois.findAll({ where: item, raw: true })
  }
  async defineModel() {
    this._herois = this._driver.define('herois', {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        required: true
      },
      poder: {
        type: Sequelize.STRING,
        required: true
      }
    }, {
      tableName: 'TB_HEROIS',
      freezeTableName: false,
      timestamps: false
    })
    await this._herois.sync()
  }
  async connect() {
    this._driver = new Sequelize(
      'heroes',
      'pauloricardoma',
      'root',
      {
        host: 'localhost', //devido ao docker neste caso
        dialect: 'postgres',
        quoteIdentifiers: false, //ignorar case sensitive
        operatorAliases: false, // erros de deprecade ignorados
        omitNull: false //necessário para resolver id auto increment
      }
    )
    await this.defineModel()
  }
}
module.exports = Postgres
