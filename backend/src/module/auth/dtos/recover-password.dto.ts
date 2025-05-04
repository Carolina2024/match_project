import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @ApiProperty({
    description: 'Correo electrónico registrado para enviar el código de recuperación',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;
}
