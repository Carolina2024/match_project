import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { AdopterHomeType } from 'src/common/enums/adopterHomeType.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdopterDto {
  @ApiProperty({
    description: 'Fecha de nacimiento del adoptante',
    example: '1998-09-21',
    type: 'string',
  })
  @IsDateString(
    {},
    {
      message: 'La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  birthDate: string;

  @ApiProperty({
    description: 'RUN del adoptante',
    example: '12345678-9',
    type: 'string',
  })
  @Matches(/^([1-9]|[1-9]\d|[1-9]\d{2})((\.\d{3})*|(\d{3})*)\-(\d|k|K)$/, {
    message: 'Ingrese un RUN válido siguiendo el siguiente formato: 12345678-9',
  })
  @IsNotEmpty({ message: 'El RUN es requerido' })
  run: string;

  @ApiProperty({
    description: 'La dirección de residencia del adoptante',
    example:
      'Calle 12, Departamento 4, Comuna San Miguel, Región Metropolitana',
    type: 'string',
  })
  @IsNotEmpty({ message: 'La dirección de residencia es requerida' })
  @IsString({
    message: 'La dirección de residencia debe ser una cadena de texto',
  })
  address: string;

  @ApiProperty({
    description: 'Tipo de vivienda del Adoptante',
    example: AdopterHomeType.BIG_APARTMENT,
    enum: AdopterHomeType,
  })
  @IsEnum(AdopterHomeType)
  @IsNotEmpty({ message: 'El tipo de vivienda es requerido' })
  homeType: AdopterHomeType;

  @ApiProperty({
    description: '¿Se permiten mascotas en el hogar del adoptante?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Se permiten mascotas en el hogar del adoptante? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La respuesta a ¿Se permiten mascotas en el hogar del adoptante? es requerida',
  })
  allowsPets: boolean;

  @ApiProperty({
    description: '¿Tiene perros en su hogar?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Tiene perros en su hogar? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Tiene perros en su hogar? es requerida',
  })
  hasDogs: boolean;

  @ApiProperty({
    description: '¿Tiene gatos en su hogar?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Tiene gatos en su hogar? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Tiene gatos en su hogar? es requerida',
  })
  hasCats: boolean;

  @ApiProperty({
    description: '¿Tiene niños en su hogar?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Tiene niños en su hogar? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Tiene niños en su hogar? es requerida',
  })
  hasChildren: boolean;

  @ApiProperty({
    description: '¿Tiene experiencia cuidando mascotas?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Tiene experiencia cuidando mascotas? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La respuesta a ¿Tiene experiencia cuidando mascotas? es requerida',
  })
  petsExperience: boolean;

  @ApiProperty({
    description: '¿Sus mascotas están vacunadas?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Sus mascotas están vacunadas? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Sus mascotas están vacunadas? es requerida',
  })
  isVaccinated: boolean;

  @ApiProperty({
    description: '¿Sus mascotas están esterilizadas?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Sus mascotas están esterilizadas? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Sus mascotas están esterilizadas? es requerida',
  })
  isSterilized: boolean;

  @ApiProperty({
    description: 'Cantidad de horas que pasará sola la mascota',
    example: '3',
    type: 'number',
  })
  @IsInt({
    message:
      'La cantidad de horas que pasará sola la mascota debe ser un número',
  })
  @IsNotEmpty({
    message: 'La cantidad de horas que pasará sola la mascota es requerida',
  })
  hoursAlone: number;

  @ApiProperty({
    description: '¿Que harás si la mascota destruye algo?',
    example: 'Lo educaré para que no vuelva a repetir esa acción',
    type: 'string',
  })
  @IsString({
    message:
      'La respuesta a ¿Que harás si la mascota destruye algo? debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message:
      'La respuesta a ¿Que harás si la mascota destruye algo? es requerida',
  })
  petDestroy: string;

  @ApiProperty({
    description: '¿Te comprometes a llevar a la mascota al veterinario?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Te comprometes a llevar a la mascota al veterinario? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La respuesta a ¿Te comprometes a llevar a la mascota al veterinario? es requerida',
  })
  hasVeterinarian: boolean;

  @ApiProperty({
    description: '¿Permitirías recibir visitas de la fundación?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Permitirías recibir visitas de la fundación? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La respuesta a ¿Permitirías recibir visitas de la fundación? es requerida',
  })
  allowsVisit: boolean;

  @ApiProperty({
    description: '¿Te comprometes a una adopción responsable?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Te comprometes a una adopción responsable? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La respuesta a ¿Te comprometes a una adopción responsable? es requerida',
  })
  isResponsibleAdoption: boolean;
}
