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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adoptersService: AdoptersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    const existingAdopter = await this.adoptersService.findByRun(
      registerDto.run as string,
    );

    if (existingUser) {
      throw new ConflictException('El correo ya esta registrado');
    }

    if (existingAdopter) {
      throw new ConflictException(
        'Usted ya se encuentra registrado en la base de datos',
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
      //user: newUser,
      token: this.getJwtToken(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.isActive) {
      throw new ConflictException(
        'Usuario bloqueado. Para más información, póngase en contacto con un administrador',
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

    return { message: 'Se ha iniciado sesión exitosamente', token };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
