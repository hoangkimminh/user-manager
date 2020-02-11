const { Mongol } = require('@albert-team/mongol')
const fp = require('fastify-plugin')
const { userSchema } = require('../schemas/models/user')

const { MONGODB_URI, MONGODB_DB_NAME } = process.env

const mongol = new Mongol(MONGODB_URI, MONGODB_DB_NAME)

module.exports = fp(async (server) => {
  await mongol.connect()
  await mongol.setSchema('users', userSchema, {
    ignoreUnsupportedKeywords: true,
    ignoreType: true
  })
  server.decorate('mongol', mongol)
})
