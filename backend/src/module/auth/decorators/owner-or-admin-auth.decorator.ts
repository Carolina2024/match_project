import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OwnerOrAdminGuard } from '../guards/owner-or-admin.guard';

export function OwnerOrAdminAuth() {
  return applyDecorators(
    UseGuards(AuthGuard(), OwnerOrAdminGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'El usuario no está autenticado',
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
