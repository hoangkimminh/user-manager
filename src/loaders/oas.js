const oas = require('fastify-oas')

module.exports = async (server) => {
  server.register(oas, {
    exposeRoute: true,
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'user-manager',
        description: 'user-manager API documentation',
        version: '0.3.0'
      },
      externalDocs: {
        url: 'https://github.com/night-watch-project/user-manager',
        description: 'Github'
      }
    }
  })
}
