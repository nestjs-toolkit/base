import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLocaleInterceptor } from '@nestjs-toolkit/base/locale';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLocaleInterceptor,
    },
  ],
})
export class AppModule {}
