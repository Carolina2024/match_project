import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john@example.com',
    type: 'string',
  })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'Ingrese un correo electrónico válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'pass123**',
    type: 'string',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  password: string;
}
