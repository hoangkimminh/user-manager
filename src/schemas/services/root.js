const {
  userSchema,
  _idSchema,
  usernameSchema,
  nameSchema,
  avatarSchema,
  emailSchema,
  birthdaySchema,
  linkedAccountsSchema
} = require('../models/user')

const getAllUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: userSchema
    }
  }
}

const createUserSchema = {
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
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: _idSchema
      }
    }
  }
}

const getUserByIDSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: _idSchema
    }
  },
  response: {
    200: userSchema
  }
}

const getUserByLinkedAccountIDSchema = {
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
  },
  response: {
    200: userSchema
  }
}

const updateLinkedAccountIDSchema = {
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
  getAllUsersSchema,
  createUserSchema,
  updateLinkedAccountIDSchema,
  getUserByIDSchema,
  getUserByLinkedAccountIDSchema
}
