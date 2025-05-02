import { HomeOwnerType } from 'src/common/enums/homeOwnerType.enum';
import { AdopterHomeType } from 'src/common/enums/adopterHomeType.enum';
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
  run: string;

  @Column()
  birthDate: string;

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
  hasDogs: boolean;

  @Column({ default: false })
  hasCats: boolean;

  @Column({ default: true })
  hasChildren: boolean;

  @Column()
  petsExperience: boolean;

  @Column({ default: true })
  isVaccinated: boolean;

  @Column({ default: true })
  isSterilized: boolean;

  @Column()
  hoursAlone: number;

  @Column()
  petDestroy: string;

  @Column({ default: true })
  hasVeterinarian: boolean;

  @Column({ default: true })
  allowsVisit: boolean;

  @Column({ default: true })
  isResponsibleAdoption: boolean;

  @OneToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;
}
