import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies } from '../../../common/enums/pet.enum';

export class PetFilterDto {
  @IsOptional()
  @IsEnum(PetSpecies)
  species?: PetSpecies;

  @IsOptional()
  @IsEnum(PetSize)
  size?: PetSize;

  @IsOptional()
  @IsEnum(PetAge)
  age?: PetAge;

  @IsOptional()
  @IsEnum(PetSex)
  sex?: PetSex;

  @IsOptional()
  @IsEnum(PetEnergy)
  energy?: PetEnergy;

  @IsOptional()
  @IsString()
  breed?: string;

  // Puedes añadir más filtros según sea necesario
}