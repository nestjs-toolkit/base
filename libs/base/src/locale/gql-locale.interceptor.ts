import { Injectable } from '@nestjs/common';
import { ExtractContext } from '../context';
import { AbstractLocaleInterceptor } from './abstract-locale.interceptor';

@Injectable()
export class GqlLocaleInterceptor extends AbstractLocaleInterceptor {
  protected getContext(context): any {
    return ExtractContext.getContext(context);
  }

  protected getHeaders(context): any {
    return ExtractContext.getRequest(context)?.headers || {};
  }
}
