import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token JWT de recuperación recibido por correo',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…',
  })
  @IsString({ message: 'El token debe ser una cadena' })
  @IsNotEmpty({ message: 'El token es requerido' })
  token: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'Adopcion123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
