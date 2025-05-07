import {
  BadRequestException,
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
      registerDto.identityDocument as string,
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
      id: newUser.id
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.isActive) {
      throw new ConflictException(
        'Usuario eliminado. Para más información, póngase en contacto con un administrador',
      );
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

    return { message: 'Se ha iniciado sesión exitosamente', token, id: user.id };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async recoverPassword(email: string): Promise<{ message: string,token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const ttlMinutes = this.configService.get<number>('RECOVERY_CODE_TTL_MINUTES', 15);

  const token = this.jwtService.sign(
    {
      sub: user.id,
      purpose: 'password_recovery',            
    },
    {
      expiresIn: `${ttlMinutes}m`,
    },
  );

  await this.mailService.sendRecoveryCode(user.email,token);

  return {
    message: 'Código de recuperación enviado al correo electrónico',
    token,
  };
    
  }

  async resetPassword(token: string, newPassword: string):Promise<{ message: string }> {
    let payload: { sub: string; purpose: string; otp: string  };
    try {
      payload = this.jwtService.verify(token);
    } catch (err) {
      throw new BadRequestException('Token inválido o expirado');
    }
  
    if (payload.purpose !== 'password_recovery') {
      throw new BadRequestException('Token no válidos para recuperación');
    }
  
    const user = await this.usersService.findOneById(payload.sub);
    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(user.id, user.password);
  
    return { message: 'Contraseña actualizada exitosamente' };
  }

}
