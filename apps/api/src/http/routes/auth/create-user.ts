import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create a new User',
        tags: ['user'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(8),
        }),
        response: {
          201: z.null().describe('User created'),
          409: z
            .object({ message: z.string() })
            .describe('User already exists'),
        },
      },
    },
    async (request, replay) => {
      const { name, email, password } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (userWithSameEmail) {
        return replay
          .status(409)
          .send({ message: 'User with same e-mail already exists.' })
      }

      const passwordHash = await hash(password, 8)

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      return replay.status(201).send()
    }
  )
}
