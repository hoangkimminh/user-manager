const {
  getAllUsersSchema,
  createUserSchema,
  updateLinkedAccountIDSchema,
  getUserByIDSchema,
  getUserByLinkedAccountIDSchema
} = require('../schemas/services/root')
const RootService = require('../services/root')

module.exports = async (server, opts) => {
  const { mongol } = opts
  const rootService = new RootService(mongol)

  server.get('/', { schema: getAllUsersSchema }, async (req, res) => {
    try {
      let result = await rootService.getAllUsers()
      res.status(200).send(result)
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.post('/', { schema: createUserSchema }, async (req, res) => {
    const data = req.body
    try {
      const { insertedId } = await rootService.createUser(data)
      res.status(200).send({ _id: insertedId })
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get('/:id', { schema: getUserByIDSchema }, async (req, res) => {
    const { id } = req.params
    try {
      let result = await rootService.getUserByID(id)
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
        const user = await rootService.getUserByLinkedAccountID(service, id)
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
        await rootService.updateLinkedAccountID(service, id, newID)
        res.status(204)
      } catch (err) {
        server.log.error(err.message)
        res.status(500).send()
      }
    }
  )
}
