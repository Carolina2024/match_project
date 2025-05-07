import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
 @ApiProperty({
     description: 'Token JWT de recuperación de contraseña (expira en 15 min)',
     example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…',
  })
  @IsString()
  @IsNotEmpty({ message: 'El token es requerido' })
  token: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'Adopcion123',
  })
  @IsString({})
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  newPassword: string;
}