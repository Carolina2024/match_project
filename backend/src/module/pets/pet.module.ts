import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { Users } from '../users/entities/users.entity';
import { PassportModule } from '@nestjs/passport';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Users]), PassportModule.register({ defaultStrategy: 'jwt' }), FilesModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}