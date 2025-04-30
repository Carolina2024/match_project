import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsString, IsUrl, Matches, Max, Min } from 'class-validator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies, PetTrait } from '../../../common/enums/pet.enum';
import { Type } from 'class-transformer';

export class CreatePetDto {
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must contain only letters' })
    name: string;

    @IsEnum(PetSize)
    size: PetSize;

    @IsDate()
    @Type(() => Date)
    birthDate: Date;

    @IsEnum(PetSex)
    sex: PetSex;

    @IsEnum(PetAge)
    age: PetAge;

    @IsEnum(PetSpecies)
    species: PetSpecies;

    @IsEnum(PetEnergy)
    energy: PetEnergy;

    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Breed must contain only letters' })
    breed: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    kg: number;

    @IsBoolean()
    isVaccinated: boolean;

    @IsBoolean()
    isSterilized: boolean;

    @IsBoolean()
    isDewormed: boolean;

    @IsBoolean()
    hasMicrochip: boolean;

    @IsString()
    @Matches(/^[a-zA-Z0-9\s.,!?()-]+$/, { message: 'Story contains invalid characters' })
    story: string;

    @IsArray()
    @IsEnum(PetTrait, { each: true })
    traits: PetTrait[];

    @IsDate()
    @Type(() => Date)
    admissionDate: Date;

    @IsArray()
    @IsUrl({}, { each: true })
    photoUrls: string[];
}