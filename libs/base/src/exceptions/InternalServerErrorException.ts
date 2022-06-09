import { HttpStatus } from '@nestjs/common';
import { AbstractException } from './AbstractException';

export class InternalServerErrorException extends AbstractException {
  readonly name = 'FailedException';

  constructor(
    message = 'Something went wrong!',
    code = 'E_INTERNAL_SERVER_ERROR',
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    properties?: Record<string, any>,
  ) {
    super(message, code, status, properties);
  }
}
