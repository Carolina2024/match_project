import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator";
import { HomeOwnerType } from "src/common/enums/homeOwnerType.enum";
import { AdopterHomeType } from "src/common/enums/adopterHomeType.enum";
import { Users } from "src/module/users/entities/users.entity";

export class CreateAdopterDto {
  
  

  @IsEnum(HomeOwnerType)
  homeOwner: HomeOwnerType;

  @IsDateString({}, { message: 'La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)' })
  birthDate: string;
  
  @IsNumberString({}, { message: 'En el RUN sólo se permite ingresar números del 0-9'})
  @Length(8, 8, { message: 'El RUN debe tener 8 caracteres' })
  run: string;

  @IsNotEmpty({ message: 'La dirección de residencia es requerida' })
  @IsString({ message: 'La dirección de residencia debe ser una cadena de texto' })
  address: string;

  @IsEnum(AdopterHomeType)
  homeType: AdopterHomeType;
  
  @IsBoolean()
  allowsPets: boolean ;

  @IsBoolean()
  hasDogs: boolean;

  @IsBoolean()
  hasCats: boolean;

  @IsBoolean()
  hasChildren: boolean;

  @IsBoolean()
  petsExperience: boolean;

  @IsBoolean()
  isVaccinated?: boolean;

  @IsBoolean()
  isSterilized: boolean;

  @IsNumber()
  hoursAlone: number;

  @IsString()
  @IsNotEmpty()
  petDestroy: string;

  @IsBoolean()
  hasVeterinarian: boolean;

  @IsBoolean()
  allowsVisit: boolean;

  @IsBoolean()
  isResponsibleAdoption: boolean;

  user:Users

  
}