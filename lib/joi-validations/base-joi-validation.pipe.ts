import { ObjectSchema } from 'joi';
import { ArgumentMetadata, HttpStatus, PipeTransform } from '@nestjs/common';
import { ValidateFailedException } from '../exceptions';
import { buildMessageValidationApollo } from './build-message-validation';
import { JoiDataRecord } from './types';

export abstract class BaseJoiValidationPipe<T = any, R = any>
  implements PipeTransform<T, R>
{
  abstract rules(data: T): ObjectSchema;

  messages(): JoiDataRecord {
    return {};
  }

  attributes(): Record<string, string> {
    return {};
  }

  errorCode(): string {
    return 'validation_failed';
  }

  errorMessage(): string {
    return 'Falha de validação dos dados';
  }

  protected extractData(data: T) {
    return data;
  }

  protected transformResponse?(value: any, data: T): R;

  transform(data: T, metadata: ArgumentMetadata): R {
    const { error, value } = this.rules(data).validate(this.extractData(data), {
      abortEarly: false,
    });

    if (error) {
      throw new ValidateFailedException(
        this.errorMessage(),
        this.errorCode(),
        HttpStatus.BAD_REQUEST,
        buildMessageValidationApollo(error, this.messages(), this.attributes()),
      );
    }

    return this.transformResponse ? this.transformResponse(value, data) : value;
  }
}
