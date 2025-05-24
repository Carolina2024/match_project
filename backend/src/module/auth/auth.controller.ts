import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  AuthLoginDocs,
  AuthRecoverPasswordDocs,
  AuthRegisterDocs,
  AuthResetPasswordDocs,
} from './auth.controller.docs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @AuthRegisterDocs()
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @AuthLoginDocs()
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('recover-password')
  @UseGuards(ThrottlerGuard)
  @AuthRecoverPasswordDocs()
  async recoverPassword(
    @Body() dto: RecoverPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.recoverPassword(dto.email);
  }

  @Post('reset-password')
  @AuthResetPasswordDocs()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
