import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export enum ExecutionContextTypeEnum {
  GQL,
  HTTP,
}

export class ExtractContext {
  public static isHTTP(context: ExecutionContext): boolean {
    return ExtractContext.getType(context) === ExecutionContextTypeEnum.HTTP;
  }

  public static isGql(context: ExecutionContext): boolean {
    return ExtractContext.getType(context) === ExecutionContextTypeEnum.GQL;
  }

  public static getRequest(context: ExecutionContext): any {
    return ExtractContext.isGql(context)
      ? GqlExecutionContext.create(context).getContext().req
      : context.switchToHttp().getRequest();
  }

  public static getContext(context: ExecutionContext): any {
    return ExtractContext.isGql(context)
      ? GqlExecutionContext.create(context).getContext()
      : context;
  }

  public static getType(context: ArgumentsHost): ExecutionContextTypeEnum {
    return context.getArgs().length === 4
      ? ExecutionContextTypeEnum.GQL
      : ExecutionContextTypeEnum.HTTP;
  }
}
