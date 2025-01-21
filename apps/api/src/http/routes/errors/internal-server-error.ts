import { StatusCodes } from 'http-status-codes'

import { ErrorResponseType } from '.'

export class InternalServerError extends Error {
  constructor({ cause }:{ cause: unknown, }) {
    super('Internal server error.', { cause })
    this.name = 'InternalServerError'
  }

  get statusCode() {
    return StatusCodes.INTERNAL_SERVER_ERROR
  }

  toJSON(): ErrorResponseType {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    }
  }
}
