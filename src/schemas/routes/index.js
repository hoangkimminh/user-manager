const body = {
  type: 'object',
  required: ['name', 'avatar', 'email', 'linkedAccounts'],
  properties: {
    username: {
      type: 'string',
      minLength: 6,
      maxLength: 24,
      pattern: '^[A-Za-z0-9]+$'
    },
    name: {
      type: 'string',
      minLength: 6,
      maxLength: 48
    },
    avatar: {
      type: 'string'
    },
    email: {
      type: 'string',
      minLength: 6,
      maxLength: 256
    },
    birthday: {
      type: ['string', 'null'],
      format: 'date'
    },
    linkedAccounts: {
      type: 'object',
      required: ['facebook'],
      properties: {
        facebook: {
          type: 'string',
          minLength: 15,
          maxLength: 16
        }
      }
    }
  }
}

const createUserReqSchema = { body }

const params = {
  type: 'object',
  required: ['service', 'id', 'newID'],
  properties: {
    service: { 
      enum: ['facebook', 'messenger'] 
    },
    id: { 
      type: 'string',
      minLength: 16,
      maxLength: 21 
    },
    newID: { 
      type: 'string',
      minLength: 16,
      maxLength: 21 
    }
  }
}

const updateLinkedAccountIDReqSchema = { params }

module.exports = { createUserReqSchema, updateLinkedAccountIDReqSchema }
