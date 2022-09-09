const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null
    this._connect()
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
  create(item) {
    console.log('O item foi salvo em Postgres')
  }
  async defineModel() {
    this._herois = driver.define('herois', {
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
  _connect() {
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
  }
}
module.exports = Postgres
