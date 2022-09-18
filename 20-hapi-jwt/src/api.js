// npm i hapi
// npm i @hapi/vision @hapi/inert hapi-swagger

const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const JWT_SECRET = 'MEU_SEGREDÃO_BEM_SECRETO_123321'

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}
 
async function main() {
  const connection = MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroiSchema))
  
  const swaggerOptions = {
    info: {
      title: 'API Herois - #CursoNodeBR',
      version: 'v1.0'
    }
  }
  await app.register([ 
    Vision, 
    Inert, 
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
  ])

  await app.start()
  console.log('Servidor rodando na porta', app.info.port)

  return app
}

module.exports = main()
