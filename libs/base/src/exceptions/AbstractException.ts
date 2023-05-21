import { HttpException } from '@nestjs/common';

export class AbstractException extends HttpException {
  /**
   * Compativel com ApolloError
   */
  public extensions: Record<string, any>;

  public isCustomException = true;

  get errorCode(): string {
    return this.extensions.code;
  }

  constructor(
    message: string,
    code: string,
    status: number,
    properties?: Record<string, any>,
    error?: Error,
  ) {
    super({ message, code, httpCode: status, ...properties }, status);

    // if no name provided, use the default. defineProperty ensures that it stays non-enumerable
    if (!this.name) {
      Object.defineProperty(this, 'name', { value: 'AbstractException' });
    }

    this.extensions = { code, httpCode: status, ...properties };

    if (error) {
      this.setException(error);
    }
  }

  public setValidation(validation: any): this {
    this.extensions.validation = validation;
    return this;
  }

  public setData(data: any): this {
    this.extensions.data = data;
    return this;
  }

  public setException(error: Error): this {
    this.extensions.original_error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
    return this;
  }

  toJSON() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      extensions: this.extensions,
    };
  }
}
