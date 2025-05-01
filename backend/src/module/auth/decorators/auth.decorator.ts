import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/userRole.enum';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'El usuario no se autenticó',
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    }),
    ApiForbiddenResponse({
      description: 'Usuario sin permisos para acceder al recurso',
      example: {
        message: 'Usuario sin permisos suficientes',
        error: 'Forbidden',
        statusCode: 403,
      },
    }),
  );
}
