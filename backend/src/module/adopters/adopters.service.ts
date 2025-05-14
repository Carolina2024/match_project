import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Adopters } from './entities/adopters.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../matches/entities/match.entity';
import { MatchStatus } from '../../common/enums/match-status.enum';

@Injectable()
export class AdoptersService {
  constructor(
    @InjectRepository(Adopters)
    private readonly adoptersRepository: Repository<Adopters>,
    @InjectRepository(Match)
  private matchRepository: Repository<Match>,
  ) {}

  async create(createAdoptersDto: Adopters): Promise<Adopters> {
    const adopter = this.adoptersRepository.create(createAdoptersDto);
    return this.adoptersRepository.save(adopter);
  }

  async findByIdentityDocument(identityDocument: string) {
    const adopter = this.adoptersRepository.findOne({
      where: { identityDocument, user: { isActive: true } },
      relations: ['user'],
    });
    return adopter;
  }

  async updateAdopter(
    id: string,
    updateAdopterDto: Partial<Adopters>,
  ): Promise<Adopters | null> {
    const adopter = await this.adoptersRepository.findOne({ 
      where: { id },
      relations: ['user']
    });
    
    if (!adopter) {
      throw new NotFoundException(`Adopter con id ${id} no encontrado`);
    }
    
    const activeMatches = await this.matchRepository.find({
      where: [
        { userId: adopter.user.id, status: MatchStatus.POR_REVISAR },
        { userId: adopter.user.id, status: MatchStatus.EN_PROCESO }
      ]
    });
    
    if (activeMatches.length > 0) {
      throw new BadRequestException(
        'No se puede actualizar el perfil mientras existan solicitudes de adopción en estado "Por revisar" o "En proceso"'
      );
    }
    
    const adopterUpdated = await this.adoptersRepository.update(
      id,
      updateAdopterDto,
    );
    
    if (adopterUpdated.affected === 0) {
      throw new NotFoundException(`Adopter con id ${id} no encontrado`);
    }

    return this.adoptersRepository.findOne({ where: { id } });
  }
}
