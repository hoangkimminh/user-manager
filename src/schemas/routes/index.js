const {
  _idSchema,
  usernameSchema,
  nameSchema,
  avatarSchema,
  emailSchema,
  birthdaySchema,
  linkedAccountsSchema
} = require('../models/user')

const createUserReqSchema = {
  body: {
    type: 'object',
    required: ['name', 'avatar', 'email', 'linkedAccounts'],
    properties: {
      username: usernameSchema,
      name: nameSchema,
      avatar: avatarSchema,
      email: emailSchema,
      birthday: birthdaySchema,
      linkedAccounts: {
        type: linkedAccountsSchema.type,
        required: ['facebook'],
        properties: linkedAccountsSchema.properties
      }
    }
  }
}

const getUserByIDReqSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: _idSchema
    }
  }
}

const getUserByLinkedAccountIDReqSchema = {
  params: {
    type: 'object',
    required: ['service', 'id'],
    properties: {
      service: {
        enum: Object.keys(linkedAccountsSchema.properties)
      },
      id: {
        type: 'string',
        minLength: 15,
        maxLength: 21
      }
    }
  }
}

const updateLinkedAccountIDReqSchema = {
  params: {
    type: 'object',
    required: ['service', 'id', 'newID'],
    properties: {
      service: {
        enum: Object.keys(linkedAccountsSchema.properties)
      },
      id: {
        type: 'string',
        minLength: 15,
        maxLength: 21
      },
      newID: {
        type: 'string',
        minLength: 15,
        maxLength: 21
      }
    }
  }
}

module.exports = {
  createUserReqSchema,
  updateLinkedAccountIDReqSchema,
  getUserByIDReqSchema,
  getUserByLinkedAccountIDReqSchema
}
