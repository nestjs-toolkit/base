import { HttpStatus } from '@nestjs/common';
import { AbstractException } from './AbstractException';

export class UnauthorizedException extends AbstractException {
  readonly name = 'UnauthorizedException';

  constructor(
    message = 'Unauthorized',
    code = 'E_UNAUTHORIZED',
    status = HttpStatus.UNAUTHORIZED,
    properties?: Record<string, any>,
  ) {
    super(message, code, status, properties);
  }
}
