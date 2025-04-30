import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar un usuario adoptante',
    description: 'Permite registrar a un usuario con el rol de Adoptante',
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
      message: ['Ingrese un correo electrónico válido'],
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
  @ApiConflictResponse({
    description: 'El usuario ha sido bloqueado por un Administrador',
    example: {
      message:
        'Usuario bloqueado. Para más información, póngase en contacto con un administrador',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
