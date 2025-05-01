import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from 'src/common/enums/userRole.enum';
import { Users } from 'src/module/users/entities/users.entity';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as Users;

    const idParam = request.params.id;

    if (user?.role === UserRole.ADMIN || user.id == idParam) return true;
    throw new ForbiddenException('Usuario sin permisos suficientes');
  }
}
