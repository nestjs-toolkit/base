import { HttpStatus } from '@nestjs/common';
import { JoiMessageValidation } from '../joi-validations/types';
import { ValidateFailedException } from './ValidateFailedException';

type Properties = {
  validation: JoiMessageValidation[];
  exception: null;
};

export class RowValidationException extends ValidateFailedException {
  constructor(
    field: string,
    validation: string,
    message: string,
    messageTop = 'Falha de validação dos dados',
  ) {
    super(
      messageTop,
      'VALIDATION_FAILED',
      HttpStatus.BAD_REQUEST,
      RowValidationException.build(field, validation, message),
    );
  }

  static build(field: string, validation: string, message: string): Properties {
    return {
      validation: [
        {
          field,
          validation,
          message,
        },
      ],
      exception: null,
    };
  }
}
