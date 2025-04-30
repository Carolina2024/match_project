import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Adopters } from './entities/adopters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdopterDto } from './dtos/create-adopter.dto';

@Injectable()
export class AdoptersService {
  constructor(
    @InjectRepository(Adopters)
    private readonly adoptersRepository: Repository<Adopters>,
  ) {}

  async create(createAdoptersDto: Adopters): Promise<Adopters> {
    const adopter = this.adoptersRepository.create(createAdoptersDto);
    return this.adoptersRepository.save(adopter);
  }

  async findByRun(run: string) {
    const adopter = this.adoptersRepository.findOne({ where: { run } });
    return adopter;
  }
}
