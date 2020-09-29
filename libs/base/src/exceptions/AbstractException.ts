import { HttpException } from '@nestjs/common';

export class AbstractException extends HttpException {
  /**
   * Compativel com ApolloError
   */
  public extensions: Record<string, any>;

  constructor(
    message: string,
    code: string,
    status: number,
    properties?: Record<string, any>,
  ) {
    super(message, status);

    // if no name provided, use the default. defineProperty ensures that it stays non-enumerable
    if (!this.name) {
      Object.defineProperty(this, 'name', { value: 'AbstractException' });
    }

    this.extensions = { code, http_code: status, ...properties };
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
}
