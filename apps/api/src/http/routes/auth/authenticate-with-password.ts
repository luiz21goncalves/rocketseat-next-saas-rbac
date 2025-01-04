import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function authenticationWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['session'],
        summary: 'Authentication with e-mail & password',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          [StatusCodes.CREATED]: z
            .object({ token: z.string() })
            .describe('Login Succeeded'),
          [StatusCodes.BAD_REQUEST]: z
            .object({ message: z.string() })
            .describe('Wrong credentials'),
        },
      },
    },
    async (request, replay) => {
      const { email, password } = request.body

      const userFromEmail = await prisma.user.findUnique({ where: { email } })

      if (!userFromEmail) {
        return replay
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'Invalid credentials.' })
      }

      if (!userFromEmail.passwordHash) {
        return replay
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'Invalid credentials.' })
      }

      const isPasswordValid = await compare(
        password,
        userFromEmail.passwordHash
      )

      if (!isPasswordValid) {
        return replay
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'Invalid credentials.' })
      }

      const token = await replay.jwtSign(
        {},
        { sign: { expiresIn: '7d', sub: userFromEmail.id } }
      )

      return replay.status(StatusCodes.CREATED).send({ token })
    }
  )
}
