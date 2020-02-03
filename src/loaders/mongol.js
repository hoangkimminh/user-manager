const { Mongol } = require('@albert-team/mongol')
const { userSchema } = require('../schemas/models/user')

const { MONGODB_URI, MONGODB_DB_NAME } = process.env

const mongol = new Mongol(MONGODB_URI, MONGODB_DB_NAME)

module.exports = async () => {
  await mongol.connect()
  await mongol.setSchema('users', userSchema, {
    ignoreUnsupportedKeywords: true,
    ignoreType: true
  })
  return mongol
}
