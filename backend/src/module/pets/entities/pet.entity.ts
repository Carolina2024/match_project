import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies, PetTrait } from '../../../common/enums/pet.enum';
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsString, IsUrl, Matches, Max, Min } from 'class-validator';

@Entity('pets')
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'El nombre debe contener solo letras' })
    name: string;

    @Column({
        type: 'enum',
        enum: PetSize
    })
    @IsEnum(PetSize)
    size: PetSize;

    @Column({ type: 'date' })
    @IsDate()
    birthDate: Date;

    @Column({
        type: 'enum',
        enum: PetSex
    })
    @IsEnum(PetSex)
    sex: PetSex;

    @Column({
        type: 'enum',
        enum: PetAge
    })
    @IsEnum(PetAge)
    age: PetAge;

    @Column({
        type: 'enum',
        enum: PetSpecies
    })
    @IsEnum(PetSpecies)
    species: PetSpecies;

    @Column({
        type: 'enum',
        enum: PetEnergy
    })
    @IsEnum(PetEnergy)
    energy: PetEnergy;

    @Column()
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, { message: 'La raza debe contener solo letras' })
    breed: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    @IsNumber()
    @Min(0)
    @Max(100)
    kg: number;

    @Column()
    @IsBoolean()
    isVaccinated: boolean;

    @Column()
    @IsBoolean()
    isSterilized: boolean;

    @Column()
    @IsBoolean()
    isDewormed: boolean;

    @Column()
    @IsBoolean()
    hasMicrochip: boolean;

    @Column({ type: 'text' })
    @IsString()
    @Matches(/^[a-zA-Z0-9\s.,!?()-]+$/, { message: 'La historia contiene caracteres inválidos' })
    story: string;

    @Column({
        type: 'enum',
        enum: PetTrait,
        array: true
    })
    @IsArray()
    @IsEnum(PetTrait, { each: true })
    traits: PetTrait[];

    @Column({ type: 'date' })
    @IsDate()
    admissionDate: Date;

    @Column('simple-array')
    @IsArray()
    @IsUrl({}, { each: true, message: 'Las URLs de fotos deben ser válidas' })
    photoUrls: string[];
    
    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;
}