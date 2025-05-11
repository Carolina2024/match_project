import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar un usuario adoptante',
    description: 'Permite registrar a un usuario con el rol de Adoptante',
  })
  @ApiCreatedResponse({
    description: 'El usuario se registra exitosamente',
    example: {
      message: 'Usuario registrado exitosamente',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2ZjIxZDY3LTZkNzMtNGM2YabcdefghiYyMjQ2OWMyNzQzNSIsImVtYWlsIjoianVhbkBleGFtcGxlLmNvbSIsInMyHeartiJhZG9wdGFudGUiLCJpYXQiOjE3NDYxMDc0NTEsImVaguasMTc0NjExNDY1MX0.RxSnt2VA-HK7zjSinJJtCa3jpbLeeJvN_cv6LH6qW00',
    },
  })
  @ApiBadRequestResponse({
    description: 'El usuario ingresa un dato con un formato inválido',
    example: {
      message: [
        'La respuesta a ¿Que harás si la mascota destruye algo? es requerida',
        'La respuesta a ¿Que harás si la mascota destruye algo? debe ser una cadena de caracteres',
        'La respuesta a ¿Te comprometes a llevar a la mascota al veterinario? es requerida',
        'La respuesta a ¿Te comprometes a llevar a la mascota al veterinario? debe ser verdadero o falso',
        'La respuesta a ¿Permitirías recibir visitas de la fundación? es requerida',
        'La respuesta a ¿Permitirías recibir visitas de la fundación? debe ser verdadero o falso',
        'La respuesta a ¿Te comprometes a una adopción responsable? es requerida',
        'La respuesta a ¿Te comprometes a una adopción responsable? debe ser verdadero o falso',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiConflictResponse({
    description:
      'El correo o el documento de identidad ingresados por el usuario ya se encuentran registrados',
    example: {
      message: 'El correo electrónico ya se encuentra registrado',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: 'Inicio de sesión de usuarios',
    description:
      'Permite a todos los usuarios registrados iniciar sesión en la plataforma',
  })
  @ApiOkResponse({
    description: 'El usuario inicia sesión exitosamente',
    example: {
      message: 'Se ha iniciado sesión exitosamente',
      token:
        'eyJpZCI6ImEwNTIxYTE0LTk0OTItNDZkMy04MWVkLWJiYThjkhNiIsImVtYWlfghfghIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG9wdGFudGUiLCJpYXQiOjE3NDYwMzk5OTgsImV4cCI6MTc0NjA0NzE5OH0.7N7YNqVzblQ4kK5yy-5MdRiO_zhtur0oou1ar22_CfQ',
    },
  })
  @ApiBadRequestResponse({
    description: 'El usuario ingresa un dato en un formato inválido',
    example: {
      message: 'Ingrese un correo electrónico válido',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario ingresa credenciales inválidas',
    example: {
      message: 'Credenciales inválidas',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiNotFoundResponse({
    description: 'El usuario ingresa un correo no registrado',
    example: {
      message: 'Usuario no encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Recuperar contraseña',
    description:
      'Permite que los usuarios que olvidaron su contraseña puedan recibir un enlace en su correo electrónico para crear una nueva contraseña',
  })
  @ApiOkResponse({
    description: 'La contraseña del usuario es actualizada exitosamente',
    example: {
      message: 'Código de recuperación enviado al correo electrónico',
    },
  })
  @ApiNotFoundResponse({
    description: 'No se encuentra un usuario con el correo ingresado',
    example: {
      message: 'Usuario no encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  async recoverPassword(
    @Body() dto: RecoverPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.recoverPassword(dto.email);
  }

  @ApiOperation({
    summary: 'Crear nueva contraseña',
    description:
      'Permite que los usuarios que olvidaron su contraseña puedan crear una nueva contraseña con el token de validación que reciben en el correo',
  })
  @ApiOkResponse({
    description: 'La contraseña del usuario es actualizada exitosamente',
    example: {
      message: 'Contraseña actualizada exitosamente',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El token del usuario es inválido o ha expirado',
    example: {
      message: 'Token inválido o expirado',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }
}
