import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

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
    type: 'string',
    example: 'Adopcion123**',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'La contraseña debe tener mínimo 6 caracteres, al menos una letra, un número y un símbolo (@$!%*?&)',
  })
  newPassword: string;
}
