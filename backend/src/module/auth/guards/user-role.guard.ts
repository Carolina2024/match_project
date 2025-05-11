import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Users } from 'src/module/users/entities/users.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { UserRole } from 'src/common/enums/userRole.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: UserRole[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;

    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<{ user: Users }>();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Usuario inválido');
    }

    if (validRoles.some((role) => role === user.role)) return true;

    throw new ForbiddenException('Usuario sin permisos suficientes');
  }
}
