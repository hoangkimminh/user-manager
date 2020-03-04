const { createTimestampHook } = require('@albert-team/mongol/builtins/hooks')
const nanoid = require('nanoid/async')
const { ObjectID } = require('mongodb')

class RootService {
  constructor(mongol) {
    this.userCollection = mongol.database.collection('users')
    mongol.attachDatabaseHook(this.userCollection, createTimestampHook())
  }

  getAllUsers() {
    return this.userCollection.find({}).toArray()
  }

  createUser(data) {
    const { username, name, avatar, email, birthday, linkedAccounts } = data
    const { insertedId } = this.userCollection.insertOne({
      username,
      name,
      avatar,
      email,
      birthday,
      linkedAccounts: {
        ...linkedAccounts,
        messenger: 'AUTH_' + nanoid(16)
      },
      privilege: 'normal'
    })
    return insertedId
  }

  getUserByID(id) {
    const _id = new ObjectID(id)
    return this.userCollection.findOne({ _id })
  }

  getUserByLinkedAccountID(service, id) {
    return this.userCollection.findOne({
      ['linkedAccounts.' + service]: id
    })
  }

  updateLinkedAccountID(service, id, newID) {
    this.userCollection.updateOne(
      {
        ['linkedAccounts.' + service]: id
      },
      {
        $set: {
          ['linkedAccounts.' + service]: newID
        }
      }
    )
  }
}

module.exports = RootService
