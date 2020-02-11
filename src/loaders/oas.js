module.exports = (server, opts, next) => {
  server.register(require('fastify-oas'), {
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
    },
    exposeRoute: true
  })

  next()
}
