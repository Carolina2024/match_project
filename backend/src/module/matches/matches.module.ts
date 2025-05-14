import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Match } from './entities/match.entity';
import { AuthModule } from '../auth/auth.module';
import { PetModule } from '../pets/pet.module';
import { Pet } from '../pets/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Pet]), AuthModule, PetModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
