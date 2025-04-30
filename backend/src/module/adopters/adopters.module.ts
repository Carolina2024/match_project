import { Module } from '@nestjs/common';
import { AdoptersService } from './adopters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopters } from './entities/adopters.entity';

@Module({
  providers: [AdoptersService],
  imports: [TypeOrmModule.forFeature([Adopters])],
  exports: [AdoptersService]
})
export class AdoptersModule {}
