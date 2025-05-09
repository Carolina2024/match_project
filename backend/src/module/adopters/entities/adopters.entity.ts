import { AdopterHomeType } from 'src/common/enums/adopterHomeType.enum';
import { PetEnergy, PetTrait } from 'src/common/enums/pet.enum';
import { Users } from 'src/module/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('adopters')
export class Adopters {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  birthDate: string;

  @Column()
  phoneNumber: string;

  @Column()
  identityDocument: string;

  @Column()
  address: string;

  @Column({
    default: AdopterHomeType.BIG_APARTMENT,
    type: 'enum',
    enum: AdopterHomeType,
  })
  homeType: AdopterHomeType;

  @Column({ default: true })
  allowsPets: boolean;

  @Column({ default: false })
  hadPets: boolean;

  @Column({ default: true })
  hadPetsVaccinated: boolean;

  @Column({ default: true })
  hadPetsCastrated: boolean;

  @Column()
  hoursAlone: number;

  @Column()
  petDestroy: string;

  @Column({ default: true })
  preparedToVisitVeterinarian: boolean;

  @Column({ default: true })
  allowsVisit: boolean;

  @Column({ default: true })
  isResponsibleAdoption: boolean;

  @Column({ default: PetEnergy.MODERATE, type: 'enum', enum: PetEnergy })
  userPreferenceEnergy: PetEnergy;

  @Column({
    type: 'enum',
    enum: PetTrait,
    array: true,
  })
  userPreferenceTraits: PetTrait[];

  @Column({ default: false })
  userPreferenceDogs: boolean;

  @Column({ default: false })
  userPreferenceCats: boolean;

  @Column({ default: true })
  userPreferenceChildren: boolean;

  @OneToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;
}
