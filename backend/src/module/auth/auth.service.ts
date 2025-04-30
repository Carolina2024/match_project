import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from '../users/users.service';
import { AdoptersService } from '../adopters/adopters.service';
import { UserRole } from 'src/common/enums/userRole.enum';
import { mapAdopter } from './utils/auth.utils';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adoptersService: AdoptersService,
    private readonly jwtService: JwtService
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

    if (registerDto.role == UserRole.ADOPTERS) {
      const adopterData = mapAdopter(registerDto, newUser);

      await this.adoptersService.create(adopterData);
    }

    const payload:JwtPayload = { 
        id: newUser.id,
        email:newUser.email,
        role: newUser.role
    }

    return {
        message: 'Usuario registrado exitoxamente',
        user: newUser,
        token: this.getJwtToken(payload)
    }
  }

  private getJwtToken (payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
