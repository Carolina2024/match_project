import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { AdoptersService } from '../adopters/adopters.service';
import { Adopters } from '../adopters/entities/adopters.entity';
import { AuthModule } from '../auth/auth.module';
import { Match } from '../matches/entities/match.entity';

@Module({
  providers: [UsersService, AdoptersService],
  imports: [TypeOrmModule.forFeature([Users, Adopters, Match]), AuthModule],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
