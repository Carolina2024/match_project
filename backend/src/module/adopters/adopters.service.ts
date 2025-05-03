import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByIdentityDocument(identityDocument: string) {
    const adopter = this.adoptersRepository.findOne({ where: { identityDocument } });
    return adopter;
  }

  async updateAdopter(id: string, updateAdopterDto: Partial<Adopters>): Promise<Adopters|null> {
    const adopterUpdated = await this.adoptersRepository.update(id, updateAdopterDto);
    if (adopterUpdated.affected=== 0) {
      throw new NotFoundException(`Adopter con id ${id} no encontrado`);
    } 
    
   return this.adoptersRepository.findOne({where:{id}});
    
  }
}
