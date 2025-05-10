import { UserRole } from 'src/common/enums/userRole.enum';
import { Adopters } from 'src/module/adopters/entities/adopters.entity';
import { Match } from 'src/module/matchs/entities/match.entity';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fullname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: UserRole.ADOPTERS, type: 'enum', enum: UserRole})
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;
  
  @CreateDateColumn()
  createdAt:Date;

  @OneToOne(() => Adopters , adopter => adopter.user)
  adopter?: Adopters

  @OneToMany(() => Match, match => match.user)
  matches: Match[];
}