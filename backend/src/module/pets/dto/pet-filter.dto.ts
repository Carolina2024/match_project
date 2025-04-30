import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies } from '../../../common/enums/pet.enum';

export class PetFilterDto {
  @IsOptional()
  @IsEnum(PetSpecies, { message: 'La especie debe ser un valor válido' })
  species?: PetSpecies;

  @IsOptional()
  @IsEnum(PetSize, { message: 'El tamaño debe ser un valor válido' })
  size?: PetSize;

  @IsOptional()
  @IsEnum(PetAge, { message: 'La edad debe ser un valor válido' })
  age?: PetAge;

  @IsOptional()
  @IsEnum(PetSex, { message: 'El sexo debe ser un valor válido' })
  sex?: PetSex;

  @IsOptional()
  @IsEnum(PetEnergy, { message: 'El nivel de energía debe ser un valor válido' })
  energy?: PetEnergy;

  @IsOptional()
  @IsString({ message: 'La raza debe ser una cadena de texto' })
  breed?: string;
}