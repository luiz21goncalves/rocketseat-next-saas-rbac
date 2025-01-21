import { StatusCodes } from 'http-status-codes'

import { ErrorResponseType } from '.'

export class InvalidCredentialsError extends Error {
  constructor({ cause }:{ cause: unknown }) {
    super('Credentials are not valid.', { cause })
    this.name = 'InvalidCredentialsError'
  }

  get statusCode() {
    return StatusCodes.BAD_REQUEST
  }

  toJSON(): ErrorResponseType {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    }
  }
}
