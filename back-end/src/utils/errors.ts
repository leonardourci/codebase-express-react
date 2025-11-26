import { ValidationError } from 'joi'

import { EStatusCodes } from '../domain/statusCodes'

export class CustomError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class JoiValidationError extends CustomError {
  public messages: Array<string>

  constructor(error: ValidationError) {
    super(error.message, EStatusCodes.UNPROCESSABLE)
    this.messages = error.details.map((detail) => detail.message)
  }
}
