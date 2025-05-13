import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ContactMessageDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'John Doe',
  })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'El nombre solo debe contener letras',
  })
  @MinLength(3, { message: 'Ingresa un nombre de al menos 3 caracteres' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '+56123456789',
    type: 'string',
  })
  @Matches(/^(\+56)\d{9}$/, {
    message:
      'Ingrese un número de teléfono válido en Chile siguiendo el siguiente formato: +56123456789',
  })
  @IsNotEmpty({ message: 'El número de teléfono es requerido' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Mensaje del usuario',
    example:
      'Hola, estoy interesado en colaborar con la fundación. ¿Como podemos agendar una cita?',
  })
  @IsString({ message: 'El mensaje debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El mensaje es requerido' })
  message: string;
}
