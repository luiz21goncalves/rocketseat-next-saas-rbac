import { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import {
  InvalidCredentialsError
} from '../routes/errors/invalid-credentials-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch (error) {
        throw new InvalidCredentialsError({ cause: error })
      }
    }
  })
})
