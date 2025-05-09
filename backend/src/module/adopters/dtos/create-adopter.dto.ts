import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { AdopterHomeType } from 'src/common/enums/adopterHomeType.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsAdult } from '../decorators/is-adult.validator';
import { PetEnergy, PetTrait } from 'src/common/enums/pet.enum';

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
  @IsAdult()
  birthDate: string;

  @ApiProperty({
    description: 'Número de teléfono del Adoptante',
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
    description: 'Documento de Identidad del adoptante',
    example: '12345678-9',
    type: 'string',
  })
  @Matches(/^([1-9]|[1-9]\d|[1-9]\d{2})((\.\d{3})*|(\d{3})*)-(\d|k|K)$/, {
    message:
      'Ingrese un Documento de Identidad válido en Chile siguiendo el siguiente formato: 12345678-9',
  })
  @IsNotEmpty({ message: 'El Documento de Identidad es requerido' })
  identityDocument: string;

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
    description: '¿Ha tenido mascotas antes?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Ha tenido mascotas antes? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Ha tenido mascotas antes? es requerida',
  })
  hadPets: boolean;

  @ApiProperty({
    description: '¿Sus mascotas estaban vacunadas?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Sus mascotas estaban vacunadas? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Sus mascotas estaban vacunadas? es requerida',
  })
  hadPetsVaccinated: boolean;

  @ApiProperty({
    description: '¿Sus mascotas estaban castradas?',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La respuesta a ¿Sus mascotas estaban castradas? debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message: 'La respuesta a ¿Sus mascotas estaban castradas? es requerida',
  })
  hadPetsCastrated: boolean;

  @ApiProperty({
    description:
      'Cantidad de horas que pasará sola la mascota entre 0-23 horas',
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
  @Min(0, { message: 'El valor minimo permitido es 0' })
  @Max(23, { message: 'El valor maximo permitido es 23' })
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
  preparedToVisitVeterinarian: boolean;

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

  @ApiProperty({
    description:
      'Determina las preferencias del usuario sobre el nivel de energía de la mascota',
    enum: PetEnergy,
    example: PetEnergy.MODERATE,
  })
  @IsEnum(PetEnergy, {
    message: 'El nivel de energía debe ser un valor válido',
  })
  userPreferenceEnergy: PetEnergy;

  @ApiProperty({
    description:
      'Preferencias del usuario sobre los rasgos de personalidad de la mascota',
    enum: PetTrait,
    isArray: true,
    example: [PetTrait.AFFECTIONATE, PetTrait.PLAYFUL],
  })
  @IsArray({ message: 'Los rasgos deben ser un arreglo' })
  @IsEnum(PetTrait, {
    each: true,
    message: 'Cada rasgo debe ser un valor válido',
  })
  userPreferenceTraits: PetTrait[];

  @ApiProperty({
    description:
      'Preferencias del usuario con una mascota con compatibilidad con los perros',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La preferencia del usuario por la compatiblidad con los perros debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La preferencia del usuario por la compatiblidad con los perros es requerida',
  })
  userPreferenceDogs: boolean;

  @ApiProperty({
    description:
      'Preferencias del usuario con una mascota con compatibilidad con los gatos',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La preferencia del usuario por la compatiblidad con los gatos debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La preferencia del usuario por la compatiblidad con los gatos es requerida',
  })
  userPreferenceCats: boolean;

  @ApiProperty({
    description:
      'Preferencias del usuario con una mascota con compatibilidad con los niños',
    example: true,
    type: 'boolean',
  })
  @IsBoolean({
    message:
      'La preferencia del usuario por la compatiblidad con los niños debe ser verdadero o falso',
  })
  @IsNotEmpty({
    message:
      'La preferencia del usuario por la compatiblidad con los niños es requerida',
  })
  userPreferenceChildren: boolean;
}
