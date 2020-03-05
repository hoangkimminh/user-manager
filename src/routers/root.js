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
    try {
      const { insertedId } = await rootService.createUser(req.body)
      res.status(200).send({ _id: insertedId })
    } catch (err) {
      server.log.error(err.message)
      res.status(500).send()
    }
  })

  server.get('/:id', { schema: getUserByIDSchema }, async (req, res) => {
    try {
      const { id } = req.params
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
      try {
        const { service, id } = req.params
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
      try {
        const { service, id, newID } = req.params
        await rootService.updateLinkedAccountID(service, id, newID)
        res.status(204)
      } catch (err) {
        server.log.error(err.message)
        res.status(500).send()
      }
    }
  )
}
