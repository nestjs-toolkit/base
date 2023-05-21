import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { RequestLocale } from './request-locale';

export abstract class AbstractLocaleInterceptor implements NestInterceptor {
  protected abstract getContext(context): any;

  protected abstract getHeaders(context): any;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = this.getHeaders(context);
    const locale = new RequestLocale();

    if ('time-zone' in headers) {
      locale.setTimeZone(headers['time-zone']); // Time-Zone
    } else if ('time-zone-offset' in headers) {
      locale.setTimeZoneOffset(headers['time-zone-offset']); // Time-Zone-Offset
    }

    if ('accept-language' in headers) {
      locale.setLang(headers['accept-language']); // Accept-Language
    }

    this.getContext(context).requestLocale = locale;

    return next.handle();
  }
}
