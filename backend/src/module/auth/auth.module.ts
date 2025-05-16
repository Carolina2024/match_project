import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './stategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import { AdoptersService } from '../adopters/adopters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Adopters } from '../adopters/entities/adopters.entity';
import { MailModule } from '../mail/mail.module';
import { Match } from '../matches/entities/match.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, AdoptersService],
  imports: [
    ConfigModule,
    MailModule,
    TypeOrmModule.forFeature([Users, Adopters, Match]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
