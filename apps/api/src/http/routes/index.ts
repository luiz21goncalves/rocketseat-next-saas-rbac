import { FastifyInstance } from 'fastify'

import { authenticationWithPassword } from './auth/authenticate-with-password'
import { createUser } from './auth/create-user'
import { getProfile } from './auth/get-profile'

export async function routes(app: FastifyInstance) {
  app.register(createUser)
  app.register(authenticationWithPassword)
  app.register(getProfile)
}
