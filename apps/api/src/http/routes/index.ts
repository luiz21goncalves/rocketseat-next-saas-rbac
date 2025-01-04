import { FastifyInstance } from 'fastify'

import { authenticationWithPassword } from './auth/authenticate-with-password'
import { createUser } from './auth/create-user'

export async function routes(app: FastifyInstance) {
  app.register(createUser)
  app.register(authenticationWithPassword)
}
