import { Injectable } from '@nestjs/common';
import { AbstractLocaleInterceptor } from './abstract-locale.interceptor';

@Injectable()
export class HttpLocaleInterceptor extends AbstractLocaleInterceptor {
  protected getHeaders(context): any {
    return context.switchToHttp().getRequest()?.headers || {};
  }

  protected getContext(context): any {
    return context;
  }
}
