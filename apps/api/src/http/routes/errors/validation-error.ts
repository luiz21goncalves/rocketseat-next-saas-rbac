import { StatusCodes } from 'http-status-codes'

import { ErrorResponseType } from '.'

export class ValidationError extends Error {
  constructor({ cause, details }: { cause?: unknown, details: unknown, }) {
    super('Validation failed', { cause })
    this.name = 'ValidationError'
    this.details = details
  }

  private set details(details: unknown) {
    this.details = details
  }

  get details() {
    return this.details
  }

  get statusCode() {
    return StatusCodes.BAD_REQUEST
  }

  toJSON(): ErrorResponseType & { details: unknown } {
    return {
      name: this.name,
      message: this.message,
      status_code: this.statusCode,
      details: this.details
    }
  }
}
