import { UserRole } from 'src/common/enums/userRole.enum';
import { Adopters } from 'src/module/adopters/entities/adopters.entity';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  // @OneToOne(() => Admins , admin => admin.user)
  // admin?: Admins
}