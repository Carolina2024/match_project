import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies } from '../../../common/enums/pet.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PetFilterDto {
  @ApiProperty({ 
    description: 'Filtrar por especie', 
    enum: PetSpecies, 
    required: false,
    example: PetSpecies.DOG 
  })
  @IsOptional()
  @IsEnum(PetSpecies, { message: 'La especie debe ser un valor válido' })
  species?: PetSpecies;

  @ApiProperty({ 
    description: 'Filtrar por tamaño', 
    enum: PetSize, 
    required: false,
    example: PetSize.MEDIUM 
  })
  @IsOptional()
  @IsEnum(PetSize, { message: 'El tamaño debe ser un valor válido' })
  size?: PetSize;

  @ApiProperty({ 
    description: 'Filtrar por edad', 
    enum: PetAge, 
    required: false,
    example: PetAge.YOUNG 
  })
  @IsOptional()
  @IsEnum(PetAge, { message: 'La edad debe ser un valor válido' })
  age?: PetAge;

  @ApiProperty({ 
    description: 'Filtrar por sexo', 
    enum: PetSex, 
    required: false,
    example: PetSex.MALE 
  })
  @IsOptional()
  @IsEnum(PetSex, { message: 'El sexo debe ser un valor válido' })
  sex?: PetSex;

  @ApiProperty({ 
    description: 'Filtrar por nivel de energía', 
    enum: PetEnergy, 
    required: false,
    example: PetEnergy.MODERATE 
  })
  @IsOptional()
  @IsEnum(PetEnergy, { message: 'El nivel de energía debe ser un valor válido' })
  energy?: PetEnergy;

  @ApiProperty({ 
    description: 'Filtrar por raza', 
    required: false,
    example: 'Labrador' 
  })
  @IsOptional()
  @IsString({ message: 'La raza debe ser una cadena de texto' })
  breed?: string;

  @ApiProperty({ 
    description: 'Buscar por nombre, raza o historia', 
    required: false,
    example: 'Labrador' 
  })
  @IsOptional()
  @IsString({ message: 'El término de búsqueda debe ser una cadena de texto' })
  search?: string;
}