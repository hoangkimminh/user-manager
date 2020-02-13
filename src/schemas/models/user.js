const _idSchema = {
  bsonType: 'objectId',
  type: 'string',
  minLength: 24,
  maxLength: 24,
  description: 'ID of the user'
}

const usernameSchema = {
  bsonType: ['string', 'null'],
  type: ['string', 'null'],
  minLength: 6,
  maxLength: 24,
  pattern: '^[A-Za-z0-9]+$',
  description: 'username'
}

const nameSchema = {
  bsonType: 'string',
  type: 'string',
  minLength: 6,
  maxLength: 48,
  description: "User's full name"
}

const avatarSchema = {
  bsonType: 'string',
  type: 'string',
  format: 'uri',
  description: "User's avatar URL"
}

const emailSchema = {
  bsonType: 'string',
  type: 'string',
  format: 'email',
  minLength: 6,
  maxLength: 256,
  description: "User's email"
}

const birthdaySchema = {
  bsonType: ['date', 'null'],
  type: ['string', 'null'],
  format: 'date',
  description: "User's birthday"
}

const linkedAccountsSchema = {
  bsonType: 'object',
  type: 'object',
  required: ['facebook', 'messenger'],
  properties: {
    facebook: {
      bsonType: 'string',
      type: 'string',
      minLength: 15,
      maxLength: 16,
      description: 'Facebook app-scoped ID'
    },
    messenger: {
      bsonType: 'string',
      type: 'string',
      minLength: 16,
      maxLength: 21,
      description: 'Facebook page-scoped ID for Messenger'
    }
  },
  description: "User's linked services, mapping from service names to account IDs"
}

const privilegeSchema = {
  type: 'string',
  enum: ['normal'],
  description: "User's privilege"
}

const createdAtSchema = {
  bsonType: 'date',
  type: 'string',
  format: 'date',
  description: 'Time at which the user was created'
}

const updatedAtSchema = {
  bsonType: 'date',
  type: 'string',
  format: 'date',
  description: 'Time at which the data was last updated'
}

const userSchema = {
  bsonType: 'object',
  required: [
    '_id',
    'name',
    'avatar',
    'email',
    'linkedAccounts',
    'privilege',
    'createdAt',
    'updatedAt'
  ],
  properties: {
    _id: _idSchema,
    username: usernameSchema,
    name: nameSchema,
    avatar: avatarSchema,
    email: emailSchema,
    birthday: birthdaySchema,
    linkedAccounts: linkedAccountsSchema,
    privilege: privilegeSchema,
    createdAt: createdAtSchema,
    updatedAt: updatedAtSchema
  }
}

module.exports = {
  userSchema,
  _idSchema,
  usernameSchema,
  nameSchema,
  avatarSchema,
  emailSchema,
  birthdaySchema,
  linkedAccountsSchema
}
