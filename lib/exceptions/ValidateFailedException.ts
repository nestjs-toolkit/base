import { HttpStatus } from '@nestjs/common';
import { AbstractException } from './AbstractException';

export class ValidateFailedException extends AbstractException {
  readonly name = 'ValidateFailedException';

  constructor(
    message = 'Validation error',
    code = 'E_VALIDATE_FAILED',
    status = HttpStatus.BAD_REQUEST,
    properties?: Record<string, any>,
  ) {
    super(message, code, status, properties);
  }
}
