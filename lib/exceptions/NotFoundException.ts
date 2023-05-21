import { HttpStatus } from '@nestjs/common';
import { AbstractException } from './AbstractException';

export class NotFoundException extends AbstractException {
  readonly name = 'NotFoundException';

  constructor(
    message = 'Not found',
    code = 'E_NOT_FOUND',
    status = HttpStatus.NOT_FOUND,
    properties?: Record<string, any>,
  ) {
    super(message, code, status, properties);
  }
}
