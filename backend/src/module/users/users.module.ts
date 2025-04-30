import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeORMError } from 'typeorm';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService],
  imports:[TypeOrmModule.forFeature([Users])],
  exports:[UsersService],
})
export class UsersModule {}
