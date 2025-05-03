import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { AdoptersService } from '../adopters/adopters.service';
import { Adopters } from '../adopters/entities/adopters.entity';

@Module({
  providers: [UsersService, AdoptersService],
  imports: [TypeOrmModule.forFeature([Users, Adopters]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
