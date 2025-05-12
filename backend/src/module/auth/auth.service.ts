import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { AdoptersService } from '../adopters/adopters.service';
import { mapAdopter } from './utils/auth.utils';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly adoptersService: AdoptersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException(
        'El correo electrónico ya se encuentra registrado',
      );
    }

    const existingAdopter = await this.adoptersService.findByIdentityDocument(
      registerDto.identityDocument,
    );

    if (existingAdopter) {
      throw new ConflictException(
        'El Documento de Identidad ya se encuentra registrado',
      );
    }

    const newUser = await this.usersService.create(registerDto);

    const adopterData = mapAdopter(registerDto, newUser);

    await this.adoptersService.create(adopterData);

    const payload: JwtPayload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    return {
      message: 'Usuario registrado exitosamente',
      token: this.getJwtToken(payload),
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Se ha iniciado sesión exitosamente',
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
      },
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async recoverPassword(email: string): Promise<{ message: string }> {
    console.log('recoverPassword llamado con email:', JSON.stringify(email));
    const user = await this.usersService.findByEmail(email);
    console.log('Usuario buscado:', user);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    //if (!user.isActive) throw new NotFoundException('Usuario no encontrado');

    const ttlMinutes = this.configService.get<number>(
      'RECOVERY_CODE_TTL_MINUTES',
      15,
    );
    const codigo = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const token = this.jwtService.sign(
      {
        sub: user.id,
        purpose: 'password_recovery',
        codigo
      },
      {
        expiresIn: `${ttlMinutes}m`,
      },
    );

    const frontUrl = this.configService.get<string>('FRONTEND_URL');
    const resetLink = `${frontUrl}/RecoverPassword?token=${encodeURIComponent(
      token,
    )}`;
    await this.mailService.sendRecoveryCode(user.email,resetLink,codigo,ttlMinutes);

    return {
      message: 'Te hemos enviado un correo con un enlace y un código para recuperar tu contraseña',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    let payload: { sub: string; purpose: string; otp: string };
    try {
      payload = this.jwtService.verify(token);
    } catch (err) {
      if (err) console.log(err);
      throw new UnauthorizedException('Token inválido o expirado');
    }

    if (payload.purpose !== 'password_recovery') {
      throw new UnauthorizedException('Token no válidos para recuperación');
    }

    const user = await this.usersService.findOneById(payload.sub);
    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(user.id, user.password);

    return { message: 'Contraseña actualizada exitosamente' };
  }
}
