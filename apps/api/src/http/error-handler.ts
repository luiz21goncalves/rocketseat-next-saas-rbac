import { FastifyInstance } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError
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
    const validationError = new ValidationError({
      cause: error,
      details: error.validation
    })

    return reply
      .status(validationError.statusCode)
      .send(validationError.toJSON())
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

  console.log(internalServerError)

  return reply
    .code(internalServerError.statusCode)
    .send(internalServerError.toJSON())
}
