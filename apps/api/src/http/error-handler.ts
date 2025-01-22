import { FastifyInstance } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors
} from 'fastify-type-provider-zod'

import { ConflictError } from './routes/errors/conflict-error'
import { InternalServerError } from './routes/errors/internal-server-error'
import {
  InvalidCredentialsError
} from './routes/errors/invalid-credentials-error'
import { NotFoundError } from './routes/errors/not-found-error'
import { ValidationError } from './routes/errors/validation-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({
        status_code: 400,
        name: 'ValidationError',
        message: 'Validation failed.',
        details: error.validation.map(validation => {
          return validation.schemaPath
        })
      })
  }

  if (error instanceof ConflictError) {
    return reply.code(error.statusCode).send(error.toJSON())
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.code(error.statusCode).send(error.toJSON())
  }

  if (error instanceof NotFoundError) {
    return reply.code(error.statusCode).send(error.toJSON())
  }

  if (error instanceof ValidationError) {
    return reply.code(error.statusCode).send(error.toJSON())
  }

  const internalServerError = new InternalServerError({ cause: error })

  return reply
    .code(internalServerError.statusCode)
    .send(internalServerError.toJSON())
}
