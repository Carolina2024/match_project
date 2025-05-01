import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsString, IsUrl, Matches, Max, Min } from 'class-validator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies, PetStatus, PetTrait } from '../../../common/enums/pet.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
    @ApiProperty({ description: 'Nombre de la mascota', example: 'Firulais' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'El nombre debe contener solo letras' })
    name: string;

    @ApiProperty({ 
      description: 'Tamaño de la mascota', 
      enum: PetSize,
      example: PetSize.MEDIUM 
    })
    @IsEnum(PetSize, { message: 'El tamaño debe ser un valor válido' })
    size: PetSize;

    @ApiProperty({ description: 'Fecha de nacimiento', example: '2020-01-01' })
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @Type(() => Date)
    birthDate: Date;

    @ApiProperty({ 
      description: 'Sexo de la mascota', 
      enum: PetSex,
      example: PetSex.MALE 
    })
    @IsEnum(PetSex, { message: 'El sexo debe ser un valor válido' })
    sex: PetSex;

    @ApiProperty({ 
      description: 'Edad de la mascota', 
      enum: PetAge,
      example: PetAge.YOUNG 
    })
    @IsEnum(PetAge, { message: 'La edad debe ser un valor válido' })
    age: PetAge;

    @ApiProperty({ 
      description: 'Especie de la mascota', 
      enum: PetSpecies,
      example: PetSpecies.DOG 
    })
    @IsEnum(PetSpecies, { message: 'La especie debe ser un valor válido' })
    species: PetSpecies;

    @ApiProperty({ 
      description: 'Nivel de energía de la mascota', 
      enum: PetEnergy,
      example: PetEnergy.MODERATE 
    })
    @IsEnum(PetEnergy, { message: 'El nivel de energía debe ser un valor válido' })
    energy: PetEnergy;

    @ApiProperty({ description: 'Raza de la mascota', example: 'Labrador' })
    @IsString({ message: 'La raza debe ser una cadena de texto' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'La raza debe contener solo letras' })
    breed: string;

    @ApiProperty({ description: 'Peso en kilogramos', example: 15.5 })
    @IsNumber({}, { message: 'El peso debe ser un número' })
    @Min(0, { message: 'El peso no puede ser negativo' })
    @Max(100, { message: 'El peso no puede ser mayor a 100 kg' })
    kg: number;

    @ApiProperty({ description: 'Indica si la mascota está vacunada', example: true })
    @IsBoolean({ message: 'El campo de vacunación debe ser un valor booleano' })
    isVaccinated: boolean;

    @ApiProperty({ description: 'Indica si la mascota está esterilizada', example: true })
    @IsBoolean({ message: 'El campo de esterilización debe ser un valor booleano' })
    isSterilized: boolean;

    @ApiProperty({ description: 'Indica si la mascota está desparasitada', example: true })
    @IsBoolean({ message: 'El campo de desparasitación debe ser un valor booleano' })
    isDewormed: boolean;

    @ApiProperty({ description: 'Indica si la mascota tiene microchip', example: false })
    @IsBoolean({ message: 'El campo de microchip debe ser un valor booleano' })
    hasMicrochip: boolean;

    @ApiProperty({ description: 'Historia de la mascota', example: 'Fue rescatado de la calle hace 2 meses.' })
    @IsString({ message: 'La historia debe ser una cadena de texto' })
    @Matches(/^[a-zA-Z0-9\s.,!?()-]+$/, { message: 'La historia contiene caracteres inválidos' })
    story: string;

    @ApiProperty({ 
      description: 'Rasgos de personalidad de la mascota', 
      enum: PetTrait,
      isArray: true,
      example: [PetTrait.AFFECTIONATE, PetTrait.PLAYFUL] 
    })
    @IsArray({ message: 'Los rasgos deben ser un arreglo' })
    @IsEnum(PetTrait, { each: true, message: 'Cada rasgo debe ser un valor válido' })
    traits: PetTrait[];

    @ApiProperty({ description: 'Fecha de admisión', example: '2023-01-15' })
    @IsDate({ message: 'La fecha de admisión debe ser una fecha válida' })
    @Type(() => Date)
    admissionDate: Date;

    @ApiProperty({ 
      description: 'Estado actual de la mascota', 
      enum: PetStatus,
      example: PetStatus.ADOPTED 
    })
    @IsEnum(PetStatus, { message: 'El esta en el que se encuentra la msacota debe ser un valor válido' })
    status: PetStatus;

    @ApiProperty({ 
      description: 'URLs de las fotos de la mascota', 
      isArray: true,
      example: ['https://example.com/pet1.jpg', 'https://example.com/pet2.jpg'] 
    })
    @IsArray({ message: 'Las URLs de fotos deben ser un arreglo' })
    @IsUrl({}, { each: true, message: 'Cada URL de foto debe tener un formato válido' })
    photoUrls: string[];
}