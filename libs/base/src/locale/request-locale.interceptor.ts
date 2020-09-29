import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtractContext } from '../utils';
import { RequestLocale } from './request-locale';

@Injectable()
export class RequestLocaleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = ExtractContext.getRequest(context).headers;
    const locale = new RequestLocale();

    if ('time-zone' in headers) {
      locale.setTimeZone(headers['time-zone']); // Time-Zone
    } else if ('time-zone-offset' in headers) {
      locale.setTimeZoneOffset(headers['time-zone-offset']); // Time-Zone-Offset
    }

    if ('accept-language' in headers) {
      locale.setLang(headers['accept-language']); // Accept-Language
    }

    ExtractContext.getContext(context).requestLocale = locale;

    return next.handle();
  }
}
