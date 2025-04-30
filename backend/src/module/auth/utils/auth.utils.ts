
import { RegisterDto } from "../dtos/register.dto";
import { CreateAdopterDto } from "src/module/adopters/dtos/create-adopter.dto";
import { Users } from "src/module/users/entities/users.entity";
import { AdopterHomeType } from "src/common/enums/adopterHomeType.enum";
import { HomeOwnerType } from "src/common/enums/homeOwnerType.enum";

export function mapAdopter(dto: RegisterDto, user: Users): CreateAdopterDto {
  
 
  return {
    homeOwner: dto.homeOwner ?? HomeOwnerType.OWNED,
    birthDate: dto.birthDate ?? '1990-01-01',
    run: dto.run ?? '12345678',
    address: dto.address ?? 'Street 50',
    homeType: dto.homeType ?? AdopterHomeType.HOUSE,
    allowsPets: dto.allowsPets ?? true,
    hasDogs: dto.hasDogs ?? true,
    hasCats: dto.hasCats ?? true,
    hasChildren: dto.hasChildren ?? true,
    petsExperience: dto.petsExperience ?? true,
    isVaccinated: dto.isVaccinated ?? true,
    isSterilized: dto.isSterilized ?? true,
    hoursAlone: dto.hoursAlone ?? 0,
    petDestroy: dto.petDestroy ?? '',
    hasVeterinarian: dto.hasVeterinarian ?? true,
    allowsVisit: dto.allowsVisit ?? true,
    isResponsibleAdoption: dto.isResponsibleAdoption ?? true,
    user
  };


}

