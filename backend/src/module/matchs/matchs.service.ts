import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchStatusDto } from './dto/update-match-status.dto';
import { MatchStatus } from '../../common/enums/match-status.enum';
import { PetService } from '../pets/pet.service';
import { PetStatus } from '../../common/enums/pet.enum';

@Injectable()
export class MatchsService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private petService: PetService,
  ) {}

  async create(userId: string, createMatchDto: CreateMatchDto): Promise<Match> {
    await this.petService.findOne(createMatchDto.petId);
    const activeMatches = await this.matchRepository.find({
      where: [
        { userId, status: MatchStatus.POR_REVISAR },
        { userId, status: MatchStatus.EN_PROCESO }
      ]
    });
    
    if (activeMatches.length > 0) {
      throw new BadRequestException('No puedes crear una nueva solicitud mientras tengas solicitudes en estado "Por revisar" o "En proceso"');
    }
    
    const activePetMatches = await this.matchRepository.find({
      where: [
        { petId: createMatchDto.petId, status: MatchStatus.POR_REVISAR },
        { petId: createMatchDto.petId, status: MatchStatus.EN_PROCESO }
      ]
    });
    
    if (activePetMatches.length >= 5) {
      throw new BadRequestException('Esta mascota ya tiene el máximo de 5 solicitudes activas. Por favor, intenta con otra mascota o más tarde.');
    }
    
    const match = this.matchRepository.create({
      userId,
      petId: createMatchDto.petId,
      status: MatchStatus.POR_REVISAR,
    });

    return this.matchRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ['user', 'pet'],
    });
  }

  async findByUser(userId: string): Promise<Match[]> {
    return this.matchRepository.find({
      where: { userId },
      relations: ['pet'],
    });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['user', 'pet'],
    });

    if (!match) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    return match;
  }

  async updateStatus(id: string, updateMatchStatusDto: UpdateMatchStatusDto): Promise<Match> {
    const match = await this.findOne(id);
    this.validateStatusTransition(match.status, updateMatchStatusDto.status);
    if (updateMatchStatusDto.status === MatchStatus.APROBADO) {
      await this.petService.update(match.petId, { status: PetStatus.ADOPTED }, []);
      await this.matchRepository.update(
        { 
          petId: match.petId, 
          id: Not(id),
          status: In([MatchStatus.POR_REVISAR, MatchStatus.EN_PROCESO])
        },
        { status: MatchStatus.RECHAZADO }
      );
    }
    
    await this.matchRepository.update(id, {
      status: updateMatchStatusDto.status,
    });
    
    return this.findOne(id);
  }

  private validateStatusTransition(currentStatus: MatchStatus, newStatus: MatchStatus): void {
    if (currentStatus === MatchStatus.POR_REVISAR) {
      if (newStatus !== MatchStatus.EN_PROCESO) {
        throw new BadRequestException(
          `No se puede cambiar el estado de ${MatchStatus.POR_REVISAR} a ${newStatus}. Solo se permite cambiar a ${MatchStatus.EN_PROCESO}`,
        );
      }
    } else if (currentStatus === MatchStatus.EN_PROCESO) {
      if (newStatus !== MatchStatus.APROBADO && newStatus !== MatchStatus.RECHAZADO) {
        throw new BadRequestException(
          `No se puede cambiar el estado de ${MatchStatus.EN_PROCESO} a ${newStatus}. Solo se permite cambiar a ${MatchStatus.APROBADO} o ${MatchStatus.RECHAZADO}`,
        );
      }
    } else if (currentStatus === MatchStatus.APROBADO || currentStatus === MatchStatus.RECHAZADO) {
      throw new BadRequestException(
        `No se puede cambiar el estado de una solicitud que ya está ${currentStatus}`,
      );
    }
  }
}