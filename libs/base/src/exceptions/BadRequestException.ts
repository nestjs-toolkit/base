import { HttpStatus } from '@nestjs/common';
import { AbstractException } from './AbstractException';

export class BadRequestException extends AbstractException {
  readonly name = 'BadRequestException';

  constructor(
    message = 'Request error',
    code = 'E_BAD_REQUEST',
    status = HttpStatus.BAD_REQUEST,
    properties?: Record<string, any>,
  ) {
    super(message, code, status, properties);
  }
}
