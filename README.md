# Night Watch user manager

## INSTALLATION

### Requirements

- Node.js >= 8
- MongoDB >= 3
- Dotenv files: `.env.production` and/or `.env.development`

### Instructions

```bash
$ yarn install
$ yarn start # yarn dev for development
```

## DOCUMENTATION

### Environment Variables

- `NODE_ENV` (string): "development" or "production" environment
- `PORT` (number): Port number to run the server
- `MONGODB_URI` (string): MongoDB URI
- `MONGODB_DB_NAME` (string): Database name

### Database (MongoDB)

#### User schema ("users" collection)

- `_id` (ObjectID): ID of the user
- `username` (string): Username
- `name` (string): User's full name
- `email` (string): User's email
- `birthday` (Date): User's birthday
- `linkedAccounts` (object): User's linked services, mapping from service names to account IDs
  - `facebook` (string): Facebook ID
- `privilege` (string): User's privilege
- `createdAt` (Date): Time at which the user was created
- `updatedAt` (Date): Time at which the user was updated

### Routes

#### 1. GET `/`

> Just for testing

##### Response body

- `iam`: `"/"`

#### 2. GET `/users`

> Get all users

##### Response body

Array of objects:
See [User schema](#user-schema-users-collection).

#### 3. POST `/users`

> Add a new user

##### Request body

- `username` (string): Username
- `name` (string): User's full name
- `email` (string): User's email
- `birthday` (Date): User's birthday
- `linkedAccounts` (object): User's linked services, mapping from service names to account IDs
  - `facebook` (string): Facebook ID

#### 4. GET `/users/:id`

> Get the user with `id`

##### Route parameters

- `id` (ObjectID): ID of the user

##### Response body

See [User schema](#user-schema-users-collection).

#### 5. GET `/users/linkedAccounts/:service/:id`

> Get an user via linked social network accounts

##### Route parameters

- `service` (string): Service name. Currently, only "facebook" is valid
- `id` (string): Account ID

##### Response body

See [User schema](#user-schema-users-collection).
