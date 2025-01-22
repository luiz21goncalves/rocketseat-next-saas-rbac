import { StatusCodes } from 'http-status-codes'

import { ErrorResponseType } from '.'

export class NotFoundError extends Error {
  constructor({ cause, message }:{ cause?: unknown, message: string }) {
    super(message, { cause })
    this.name = 'NotFoundError'
  }

  get statusCode() {
    return StatusCodes.NOT_FOUND
  }

  toJSON(): ErrorResponseType {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    }
  }
}
