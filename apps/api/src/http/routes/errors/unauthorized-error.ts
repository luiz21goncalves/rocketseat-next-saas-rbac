import { StatusCodes } from 'http-status-codes'

import { ErrorResponseType } from '.'

export class UnauthorizedError extends Error {
  constructor({ cause }:{ cause: unknown }) {
    super('Invalid token.', { cause })
    this.name = 'UnauthorizedError'
  }

  get statusCode() {
    return StatusCodes.UNAUTHORIZED
  }

  toJSON(): ErrorResponseType {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    }
  }
}
