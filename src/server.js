const fastify = require('fastify')
const mongolLoader = require('./loaders/mongol')
const oasLoader = require('./loaders/oas')
const rootRouter = require('./routers/root')

const loggerLevel = process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
const server = fastify({ ignoreTrailingSlash: true, logger: { level: loggerLevel } })

const main = async () => {
  try {
    server.register(mongolLoader)
    server.register(oasLoader)
    server.register(rootRouter, (parent) => {
      return { mongol: parent.mongol }
    })
    await server.listen(process.env.PORT, '::') // listen to all IPv6 and IPv4 addresses
  } catch (err) {
    server.log.error(err.message)
    process.exit(1)
  }
}

main()
