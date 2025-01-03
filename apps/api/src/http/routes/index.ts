import { FastifyInstance } from 'fastify'

import { createUser } from './auth/create-user'

export async function routes(app: FastifyInstance) {
  app.register(createUser)
}
