import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DB_CONFIG } from './config/typeorm.config';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { AdoptersModule } from './module/adopters/adopters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DB_CONFIG),
    AuthModule,
    UsersModule,
    AdoptersModule,
  ],
})
export class AppModule {}
