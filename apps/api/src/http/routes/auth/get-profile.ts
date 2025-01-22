import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { NotFoundError } from '../errors/not-found-error'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/profile',
    {
      schema: {
        tags: ['user'],
        summary: 'Get authenticated user profile',
        security: [{ Token: [] }],
        response: {
          [StatusCodes.OK]: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string().nullable(),
              email: z.string().email(),
              avatarUrl: z.string().url().nullable(),
            })
          }).describe('User profile'),
        },
      },
    },
    async (request, replay) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        where: {
          id: sub,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      })

      if (!user) {
        throw new NotFoundError({
          message: 'User not found',
          cause: { id: sub }
        })
      }

      return replay.status(StatusCodes.OK).send({ user })
    }
  )
}
