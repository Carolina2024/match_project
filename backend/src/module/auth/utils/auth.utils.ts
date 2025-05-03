import { RegisterDto } from '../dtos/register.dto';
import { Users } from 'src/module/users/entities/users.entity';
import { Adopters } from 'src/module/adopters/entities/adopters.entity';

export function mapAdopter(registerDto: RegisterDto, user: Users): Adopters {
  const {
    birthDate,
    identityDocument,
    address,
    allowsPets,
    allowsVisit,
    homeType,
    hadPets,
    hadPetsVaccinated,
    hadPetsCastrated,
    hoursAlone,
    petDestroy,
    preparedToVisitVeterinarian,
    isResponsibleAdoption,
    userPreferenceEnergy,
    userPreferenceTraits,
    userPreferenceDogs,
    userPreferenceCats,
    userPreferenceChildren,
  } = registerDto;

  return {
    birthDate,
    identityDocument,
    address,
    allowsPets,
    allowsVisit,
    homeType,
    hadPets,
    hadPetsVaccinated,
    hadPetsCastrated,
    hoursAlone,
    petDestroy,
    preparedToVisitVeterinarian,
    isResponsibleAdoption,
    userPreferenceEnergy,
    userPreferenceTraits,
    userPreferenceDogs,
    userPreferenceCats,
    userPreferenceChildren,
    user,
  };
}
