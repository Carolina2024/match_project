import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchsController } from './matchs.controller';
import { MatchsService } from './matchs.service';
import { Match } from './entities/match.entity';
import { AuthModule } from '../auth/auth.module';
import { PetModule } from '../pets/pet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    AuthModule,
    PetModule,
  ],
  controllers: [MatchsController],
  providers: [MatchsService],
  exports: [MatchsService],
})
export class MatchsModule {}