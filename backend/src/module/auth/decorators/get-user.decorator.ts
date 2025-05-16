/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from 'src/module/users/entities/users.entity';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: Users }>();
    const user: Users | undefined = request.user;

    if (!user)
      throw new InternalServerErrorException('Usuario no encontrado (request)');

    return data ? user[data] : user;
  },
);
