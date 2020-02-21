const { ObjectID } = require('mongodb')
const nanoid = require('nanoid/async')
const { createTimestampHook } = require('@albert-team/mongol/builtins/hooks')
const {
  getAllUsersSchema,
  createUserSchema,
  updateLinkedAccountIDSchema,
  getUserByIDSchema,
  getUserByLinkedAccountIDSchema
} = require('./schemas/routes')

module.exports = async (server, opts) => {
  const { mongol } = opts
  const userCollection = mongol.database.collection('users')
  mongol.attachDatabaseHook(
    userCollection,
    createTimestampHook()
  )

  server.get('/', { schema: getAllUsersSchema }, async (req, res) => {
    try {
      let result = await userCollection.find({}).toArray()
      res.status(200).send(result)
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.post('/', { schema: createUserSchema }, async (req, res) => {
    const { username, name, avatar, email, birthday, linkedAccounts } = req.body
    try {
      const { insertedId } = await userCollection.insertOne({
        username,
        name,
        avatar,
        email,
        birthday,
        linkedAccounts: {
          ...linkedAccounts,
          messenger: 'AUTH_' + (await nanoid(16))
        },
        privilege: 'normal',
      })
      res.status(200).send({ _id: insertedId })
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get('/:id', { schema: getUserByIDSchema }, async (req, res) => {
    const _id = new ObjectID(req.params.id)
    try {
      let result = await userCollection.findOne({ _id })
      res.status(200).send(result)
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get(
    '/linkedAccounts/:service/:id',
    { schema: getUserByLinkedAccountIDSchema },
    async (req, res) => {
      const { service, id } = req.params
      try {
        const user = await userCollection.findOne({
          ['linkedAccounts.' + service]: id
        })
        res.status(200).send(user)
      } catch (err) {
        server.log.error(err.message)
        res.status(500).send()
      }
    }
  )

  server.put(
    '/linkedAccounts/:service/:id/:newID',
    { schema: updateLinkedAccountIDSchema },
    async (req, res) => {
      const { service, id, newID } = req.params
      try {
        await userCollection.updateOne(
          {
            ['linkedAccounts.' + service]: id
          },
          {
            $set: {
              ['linkedAccounts.' + service]: newID
            }
          }
        )
        res.status(204)
      } catch (err) {
        server.log.error(err.message)
        res.status(500).send()
      }
    }
  )
}
