import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  PetAge,
  PetEnergy,
  PetSex,
  PetSize,
  PetSpecies,
  PetStatus,
} from '../../../common/enums/pet.enum';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetPetsQueryDto extends PaginationDto {
  @ApiProperty({
    description: 'Filtrar por especie',
    enum: PetSpecies,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetSpecies, { message: 'La especie debe ser un valor válido' })
  species?: PetSpecies;

  @ApiProperty({
    description: 'Filtrar por tamaño',
    enum: PetSize,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetSize, { message: 'El tamaño debe ser un valor válido' })
  size?: PetSize;

  @ApiProperty({
    description: 'Filtrar por edad',
    enum: PetAge,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetAge, { message: 'La edad debe ser un valor válido' })
  age?: PetAge;

  @ApiProperty({
    description: 'Filtrar por sexo',
    enum: PetSex,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetSex, { message: 'El sexo debe ser un valor válido' })
  sex?: PetSex;

  @ApiProperty({
    description: 'Filtrar por nivel de energía',
    enum: PetEnergy,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetEnergy, {
    message: 'El nivel de energía debe ser un valor válido',
  })
  energy?: PetEnergy;

  @ApiProperty({
    description: 'Filtrar por raza',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La raza debe ser una cadena de texto' })
  breed?: string;

  @ApiProperty({
    description: 'Filtrar por el estado en el que se encuentra la mascota',
    enum: PetStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(PetStatus, {
    message: 'El estado de las mascota debe ser un valor válido',
  })
  status?: PetStatus;

  @ApiProperty({
    description: 'Buscar por nombre, raza o historia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El término de búsqueda debe ser una cadena de texto' })
  search?: string;
}
