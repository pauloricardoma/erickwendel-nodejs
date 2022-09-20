// npm i hapi
// npm i @hapi/vision @hapi/inert hapi-swagger
// npm i hapi-auth-jwt2
// npm i bcrypt

const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')
const Postgres = require('./db/strategies/postgres/postgres')
const UserSchema = require('./db/strategies/postgres/schemas/userSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MEU_SEGREDÃO_BEM_SECRETO_123321'

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}
 
async function main() {
  const connectionMongoDB = MongoDB.connect()
  const contextMongoDB = new Context(new MongoDB(connectionMongoDB, HeroiSchema))

  const connectionPostgres = await Postgres.connect()
  const userSchema = await Postgres.defineModel(connectionPostgres, UserSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, userSchema))

  const swaggerOptions = {
    info: {
      title: 'API Herois - #CursoNodeBR',
      version: 'v1.0'
    }
  }
  await app.register([
    HapiJwt, 
    Vision, 
    Inert, 
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: async (dado, request) => {
      const [result] = await contextPostgres.read({
        username: dado.username.toLowerCase()
      })
      if (!result) {
        return {
          isValid: false
        }
      }
      // verifica no banco se o usuário continua ativo
      // verifica no banco se o usuário continua pagando
      return {
        isValid: true // caso não válido -> false
      }
    }
  })
  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(contextMongoDB), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
  ])

  await app.start()
  console.log('Servidor rodando na porta', app.info.port)

  return app
}

module.exports = main()
