import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    type: 'string',
    example: 'John Doe',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo debe contener letras',
  })
  @MinLength(3, { message: `Debes ingresar tu nombre completo` })
  @IsNotEmpty({ message: `El nombre y apellido es requerido` })
  fullname: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: 'string',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Ingrese un correo con un formato válido' })
  @IsNotEmpty({ message: 'El correo es requerido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    type: 'string',
    example: 'pass123**',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'La contraseña debe tener mínimo 6 caracteres, al menos una letra, un número y un símbolo (@$!%*?&)',
  })
  password: string;
}
