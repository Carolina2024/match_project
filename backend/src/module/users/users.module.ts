import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
