import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { HttpLocaleInterceptor } from '@nestjs-toolkit/base/locale/http-locale.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLocaleInterceptor,
    },
  ],
})
export class AppModule {}
