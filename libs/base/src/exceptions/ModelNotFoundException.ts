import { HttpStatus } from '@nestjs/common';
import { AbstractException } from './AbstractException';

export class ModelNotFoundException extends AbstractException {
  readonly name = 'ModelNotFoundException';

  constructor(
    message = 'Model Not found',
    code = 'E_MODEL_NOT_FOUND',
    status = HttpStatus.NOT_FOUND,
    properties?: Record<string, any>,
  ) {
    super(message, code, status, properties);
  }
}
