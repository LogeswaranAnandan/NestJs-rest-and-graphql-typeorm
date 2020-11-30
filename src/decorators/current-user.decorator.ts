import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return req.user;
  },
);
