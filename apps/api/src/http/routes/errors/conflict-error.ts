import { StatusCodes } from 'http-status-codes'

import { ErrorResponseType } from '.'

export class ConflictError extends Error {
  constructor({ cause, message }:{ cause?: unknown, message: string }) {
    super(message, { cause })
    this.name = 'ConflictError'
  }

  get statusCode() {
    return StatusCodes.CONFLICT
  }

  toJSON(): ErrorResponseType {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
    }
  }
}
