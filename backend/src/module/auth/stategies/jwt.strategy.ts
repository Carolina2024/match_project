import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/module/users/entities/users.entity';
import { JwtPayload } from '../interfaces/jwt.payload.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET') as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { email } = payload;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Token es invalido');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Usuario inactivo, habla con un administrador',
      );
    }

    return user;
  }
}
