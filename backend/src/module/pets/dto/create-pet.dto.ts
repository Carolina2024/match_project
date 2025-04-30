import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsString, IsUrl, Matches, Max, Min } from 'class-validator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies, PetTrait } from '../../../common/enums/pet.enum';
import { Type } from 'class-transformer';

export class CreatePetDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'El nombre debe contener solo letras' })
    name: string;

    @IsEnum(PetSize, { message: 'El tamaño debe ser un valor válido' })
    size: PetSize;

    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    @Type(() => Date)
    birthDate: Date;

    @IsEnum(PetSex, { message: 'El sexo debe ser un valor válido' })
    sex: PetSex;

    @IsEnum(PetAge, { message: 'La edad debe ser un valor válido' })
    age: PetAge;

    @IsEnum(PetSpecies, { message: 'La especie debe ser un valor válido' })
    species: PetSpecies;

    @IsEnum(PetEnergy, { message: 'El nivel de energía debe ser un valor válido' })
    energy: PetEnergy;

    @IsString({ message: 'La raza debe ser una cadena de texto' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'La raza debe contener solo letras' })
    breed: string;

    @IsNumber({}, { message: 'El peso debe ser un número' })
    @Min(0, { message: 'El peso no puede ser negativo' })
    @Max(100, { message: 'El peso no puede ser mayor a 100 kg' })
    kg: number;

    @IsBoolean({ message: 'El campo de vacunación debe ser un valor booleano' })
    isVaccinated: boolean;

    @IsBoolean({ message: 'El campo de esterilización debe ser un valor booleano' })
    isSterilized: boolean;

    @IsBoolean({ message: 'El campo de desparasitación debe ser un valor booleano' })
    isDewormed: boolean;

    @IsBoolean({ message: 'El campo de microchip debe ser un valor booleano' })
    hasMicrochip: boolean;

    @IsString({ message: 'La historia debe ser una cadena de texto' })
    @Matches(/^[a-zA-Z0-9\s.,!?()-]+$/, { message: 'La historia contiene caracteres inválidos' })
    story: string;

    @IsArray({ message: 'Los rasgos deben ser un arreglo' })
    @IsEnum(PetTrait, { each: true, message: 'Cada rasgo debe ser un valor válido' })
    traits: PetTrait[];

    @IsDate({ message: 'La fecha de admisión debe ser una fecha válida' })
    @Type(() => Date)
    admissionDate: Date;

    @IsArray({ message: 'Las URLs de fotos deben ser un arreglo' })
    @IsUrl({}, { each: true, message: 'Cada URL de foto debe tener un formato válido' })
    photoUrls: string[];
}