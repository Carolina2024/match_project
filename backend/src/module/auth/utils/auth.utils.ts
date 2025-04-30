import { RegisterDto } from '../dtos/register.dto';
import { Users } from 'src/module/users/entities/users.entity';
import { Adopters } from 'src/module/adopters/entities/adopters.entity';

export function mapAdopter(registerDto: RegisterDto, user: Users): Adopters {
  const {
    address,
    allowsPets,
    allowsVisit,
    birthDate,
    hasCats,
    hasChildren,
    hasDogs,
    hasVeterinarian,
    homeType,
    hoursAlone,
    isResponsibleAdoption,
    isSterilized,
    isVaccinated,
    petDestroy,
    petsExperience,
    run,
  } = registerDto;

  return {
    birthDate,
    run,
    address,
    homeType,
    allowsPets,
    hasDogs,
    hasCats,
    hasChildren,
    petsExperience,
    isVaccinated,
    isSterilized,
    hoursAlone,
    petDestroy,
    hasVeterinarian,
    allowsVisit,
    isResponsibleAdoption,
    user,
  };
}
