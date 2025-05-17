import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchStatusDto } from './dto/update-match-status.dto';
import { MatchStatus } from '../../common/enums/match-status.enum';
import { PetService } from '../pets/pet.service';
import { PetStatus } from '../../common/enums/pet.enum';
import { FilterMatchDto } from './dto/filterMatch.dto';
import { PaginationInterface } from 'src/common/interfaces/pagination.interface';
import { Pet } from '../pets/entities/pet.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private petService: PetService,

    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async create(
    userId: string,
    createMatchDto: CreateMatchDto,
  ): Promise<{ message: string }> {
    const pet = await this.petService.findOne(createMatchDto.petId);
    const activeMatches = await this.matchRepository.find({
      where: [
        { userId, status: MatchStatus.POR_REVISAR },
        { userId, status: MatchStatus.EN_PROCESO },
      ],
    });

    if (activeMatches.length > 0) {
      throw new BadRequestException(
        'No puedes crear una nueva solicitud mientras tengas una solicitud en estado `Por revisar` o `En proceso`',
      );
    }

    const activePetMatches = await this.matchRepository.find({
      where: [
        { petId: createMatchDto.petId, status: MatchStatus.POR_REVISAR },
        { petId: createMatchDto.petId, status: MatchStatus.EN_PROCESO },
      ],
    });

    if (activePetMatches.length >= 5) {
      throw new BadRequestException(
        'Esta mascota ya tiene el máximo de 5 solicitudes activas. Por favor, intenta con otra mascota.',
      );
    }

    const match = this.matchRepository.create({
      userId,
      petId: createMatchDto.petId,
      status: MatchStatus.POR_REVISAR,
    });

    await this.matchRepository.save(match);
    return {
      message: `Su solicitud de adopción por ${pet.name} ha sido enviada exitosamente. Pronto nos pondremos en contacto con usted para más información.`,
    };
  }

  async findAll(
    filterMatchDto: FilterMatchDto,
  ): Promise<PaginationInterface<Match>> {
    const { limit = 8, page = 1, search, status } = filterMatchDto;

    const queryBuilder = this.matchRepository
      .createQueryBuilder('matches')
      .leftJoinAndSelect('matches.user', 'users')
      .leftJoinAndSelect('users.adopter', 'adopters')
      .leftJoinAndSelect('matches.pet', 'pets');

    if (search) {
      queryBuilder.where(
        'LOWER(users.fullname) LIKE :search OR LOWER(pets.name) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    if (status) {
      if (search) {
        queryBuilder.andWhere('matches.status = :status', {
          status,
        });
      } else {
        queryBuilder.where('matches.status = :status', { status });
      }
    }

    const total = await queryBuilder.getCount();

    const items = await queryBuilder
      .select([
        'matches',
        'adopters.identityDocument',
        'users.fullname',
        'users.email',
        'users.id',
        'adopters.address',
        'pets',
      ])
      .skip((page - 1) * (limit || 10))
      .take(limit)
      .orderBy('matches.applicationDate', 'DESC')
      .getMany();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByUser(userId: string): Promise<Match> {
    const pet = await this.matchRepository.findOne({
      where: { userId },
      relations: ['pet'],
      select: {
        pet: {
          admissionDate: true,
          age: true,
          breed: true,
          energy: true,
          hasMicrochip: true,
          isDewormed: true,
          isSterilized: true,
          isVaccinated: true,
          kg: true,
          name: true,
          photoUrls: true,
          sex: true,
          size: true,
          species: true,
          status: true,
          story: true,
          traits: true,
        },
      },
      order: { applicationDate: 'DESC' },
    });
    if (!pet) {
      throw new NotFoundException(
        'El usuario no posee ninguna solicitud de adopción',
      );
    }
    return pet;
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['user', 'pet'],
      select: {
        user: {
          fullname: true,
          email: true,
        },
        pet: {
          admissionDate: true,
          age: true,
          breed: true,
          energy: true,
          hasMicrochip: true,
          isDewormed: true,
          isSterilized: true,
          isVaccinated: true,
          kg: true,
          name: true,
          photoUrls: true,
          sex: true,
          size: true,
          species: true,
          status: true,
          story: true,
          traits: true,
        },
      },
    });

    if (!match) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    return match;
  }

  async updateStatus(
    id: string,
    updateMatchStatusDto: UpdateMatchStatusDto,
  ): Promise<Match> {
    const match = await this.findOne(id);
    this.validateStatusTransition(match.status, updateMatchStatusDto.status);
    if (updateMatchStatusDto.status === MatchStatus.APROBADO) {
      await this.petRepository.update(match.petId, {
        status: PetStatus.ADOPTED,
      });
      await this.matchRepository.update(
        {
          petId: match.petId,
          id: Not(id),
          status: In([MatchStatus.POR_REVISAR, MatchStatus.EN_PROCESO]),
        },
        { status: MatchStatus.RECHAZADO },
      );
    }

    await this.matchRepository.update(id, {
      status: updateMatchStatusDto.status,
    });

    return this.findOne(id);
  }

  private validateStatusTransition(
    currentStatus: MatchStatus,
    newStatus: MatchStatus,
  ): void {
    if (currentStatus === MatchStatus.EN_PROCESO) {
      if (
        newStatus !== MatchStatus.APROBADO &&
        newStatus !== MatchStatus.RECHAZADO
      ) {
        throw new BadRequestException(
          `No se puede cambiar el estado de ${MatchStatus.EN_PROCESO} a ${newStatus}. Solo se permite cambiar a ${MatchStatus.APROBADO} o ${MatchStatus.RECHAZADO}`,
        );
      }
    } else if (
      currentStatus === MatchStatus.APROBADO ||
      currentStatus === MatchStatus.RECHAZADO
    ) {
      throw new BadRequestException(
        `No se puede cambiar el estado de una solicitud que ya está ${currentStatus}`,
      );
    }
  }
}
