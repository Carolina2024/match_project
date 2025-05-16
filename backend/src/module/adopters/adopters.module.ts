import { Module } from '@nestjs/common';
import { AdoptersService } from './adopters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopters } from './entities/adopters.entity';
import { Match } from '../matches/entities/match.entity';

@Module({
  providers: [AdoptersService],
  imports: [TypeOrmModule.forFeature([Adopters, Match])],
  exports: [AdoptersService],
})
export class AdoptersModule {}
