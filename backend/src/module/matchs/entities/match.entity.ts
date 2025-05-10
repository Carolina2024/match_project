import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { Pet } from '../../pets/entities/pet.entity';
import { MatchStatus } from '../../../common/enums/match-status.enum';

@Entity('matchs')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column()
  userId: string;

  @ManyToOne(() => Pet)
  @JoinColumn()
  pet: Pet;

  @Column()
  petId: string;

  @CreateDateColumn()
  applicationDate: Date;

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.POR_REVISAR,
  })
  status: MatchStatus;
}