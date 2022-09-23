const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

// npm i jsonwebtoken
const Jwt = require('jsonwebtoken')
const PasswordHelper = require('./../helpers/passwordHelper')

const failAction = (request, headers, error) => {
  throw error
}

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super()
    this.secret = secret
    this.db = db
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Obter token',
        notes: 'faz login com user e senha do banco',
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
          })
        }
      },
      handler: async (request) => {
        const { username, password } = request.payload

        const [user] = await this.db.read({
          username: username.toLowerCase()
        })
        if (!user) {
          return Boom.unauthorized('O usuário informado não existe!')
        } 

        const math = PasswordHelper.comparePassword(password, user.password)
        if (!math) {
          return Boom.unauthorized('Usuário e/ou senha inválidos!')
        }

        const token = Jwt.sign({
          id: user.id,
          username: username
        }, this.secret)
        
        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes
