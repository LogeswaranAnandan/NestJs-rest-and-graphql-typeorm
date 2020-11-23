import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req: any = ctx.getRequest();
    return req.user;
  },
);
