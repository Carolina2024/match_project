import {
  ConflictException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { GetPetsQueryDto } from './dto/get-pets-query.dto';
import { Users } from '../users/entities/users.entity';
import {
  PetTrait,
  PetEnergy,
  PetStatus,
  PetSize,
} from '../../common/enums/pet.enum';
import { AdopterHomeType } from 'src/common/enums/adopterHomeType.enum';
import { PaginationInterface } from 'src/common/interfaces/pagination.interface';
import { FilesService } from '../files/files.service';
import { Match } from '../matches/entities/match.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly filesService: FilesService,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async create(
    createPetDto: CreatePetDto,
    files: Express.Multer.File[],
  ): Promise<Pet> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Debe subir al menos una imagen');
    }

    if (files.length > 3) {
      throw new BadRequestException('No se pueden subir más de 3 imágenes');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException('Solo se permiten imágenes JPG/JPEG/PNG');
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new BadRequestException('La imagen debe pesar menos de 5MB');
      }
    }

    const photoUrls = await Promise.all(
      files.map((file) => this.filesService.uploadImageToCloudinary(file)),
    );

    const pet = this.petRepository.create({ ...createPetDto, photoUrls });

    const petExists = await this.petRepository.findOne({
      where: {
        name: createPetDto.name,
        admissionDate: createPetDto.admissionDate,
        age: createPetDto.age,
        breed: createPetDto.breed,
        energy: createPetDto.energy,
        hasMicrochip: createPetDto.hasMicrochip,
        isDewormed: createPetDto.isDewormed,
        isSterilized: createPetDto.isSterilized,
        isVaccinated: createPetDto.isVaccinated,
        kg: createPetDto.kg,
        sex: createPetDto.sex,
        size: createPetDto.size,
        species: createPetDto.species,
      },
    });

    if (petExists)
      throw new ConflictException('La mascota ingresada ya existe');

    return await this.petRepository.save(pet);
  }

  async findAll(
    queryParams: GetPetsQueryDto,
  ): Promise<PaginationInterface<Pet>> {
    const { page = 1, limit = 10, ...filterParams } = queryParams;

    const skip = (page - 1) * limit;

    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .where('pet.isActive = :isActive', { isActive: true });

    if (filterParams) {
      if (filterParams.species) {
        queryBuilder.andWhere('pet.species = :species', {
          species: filterParams.species,
        });
      }
      if (filterParams.size) {
        queryBuilder.andWhere('pet.size = :size', { size: filterParams.size });
      }
      if (filterParams.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filterParams.age });
      }
      if (filterParams.sex) {
        queryBuilder.andWhere('pet.sex = :sex', { sex: filterParams.sex });
      }
      if (filterParams.energy) {
        queryBuilder.andWhere('pet.energy = :energy', {
          energy: filterParams.energy,
        });
      }
      if (filterParams.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', {
          breed: `%${filterParams.breed}%`,
        });
      }
      if (filterParams.status) {
        queryBuilder.andWhere('pet.status = :status', {
          status: `${filterParams.status}`,
        });
      }

      if (filterParams.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search OR pet.story ILIKE :search)',
          { search: `%${filterParams.search}%` },
        );
      }
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('pet.created_at', 'DESC')
      .getManyAndCount();

    return {
      items,
      total,
      limit: +limit,
      page: +page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllLimited(
    queryParams: GetPetsQueryDto,
  ): Promise<PaginationInterface<Partial<Pet>>> {
    const { page = 1, limit = 10, ...filterParams } = queryParams;
    const skip = (page - 1) * limit;

    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .select(['pet.id', 'pet.name', 'pet.photoUrls'])
      .where('pet.isActive = :isActive', { isActive: true });

    if (filterParams) {
      if (filterParams.species) {
        queryBuilder.andWhere('pet.species = :species', {
          species: filterParams.species,
        });
      }
      if (filterParams.size) {
        queryBuilder.andWhere('pet.size = :size', { size: filterParams.size });
      }
      if (filterParams.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filterParams.age });
      }
      if (filterParams.sex) {
        queryBuilder.andWhere('pet.sex = :sex', { sex: filterParams.sex });
      }
      if (filterParams.energy) {
        queryBuilder.andWhere('pet.energy = :energy', {
          energy: filterParams.energy,
        });
      }
      if (filterParams.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', {
          breed: `%${filterParams.breed}%`,
        });
      }
      if (filterParams.status) {
        queryBuilder.andWhere('pet.status = :status', {
          status: `${filterParams.status}`,
        });
      }

      if (filterParams.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search)',
          { search: `%${filterParams.search}%` },
        );
      }
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('pet.created_at', 'DESC')
      .getManyAndCount();

    return {
      items,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id, isActive: true },
    });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return pet;
  }

  async updateById(
    id: string,
    updatePetDto: UpdatePetDto,
    files: Express.Multer.File[],
  ): Promise<Pet> {
    if (files?.length) {
      if (files.length > 3) {
        throw new BadRequestException('No se pueden subir más de 3 imágenes');
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      for (const file of files) {
        if (!allowedTypes.includes(file.mimetype)) {
          throw new BadRequestException(
            'Solo se permiten imágenes JPG/JPEG/PNG',
          );
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new BadRequestException('La imagen debe pesar menos de 5MB');
        }
      }
    }

    let newPhotoUrls: string[] = [];

    if (files?.length > 0) {
      newPhotoUrls = await Promise.all(
        files.map((file) => this.filesService.uploadImageToCloudinary(file)),
      );
    }
    if (
      updatePetDto.photoUrls !== undefined &&
      !Array.isArray(updatePetDto.photoUrls)
    ) {
      throw new BadRequestException('photoUrls debe ser un array');
    }

    const existingPet = await this.findOne(id);
    let photoUrlsFromDto: string[] = [];

    if (Array.isArray(updatePetDto.photoUrls)) {
      photoUrlsFromDto = updatePetDto.photoUrls.filter(
        (url): url is string => typeof url === 'string',
      );
    } else if (!files?.length) {
      photoUrlsFromDto = existingPet.photoUrls;
    }
    const finalPhotoUrls = [...photoUrlsFromDto, ...newPhotoUrls].slice(0, 3);
    if (finalPhotoUrls.length === 0) {
      throw new BadRequestException(
        'La mascota debe tener al menos una imagen',
      );
    }

    await this.petRepository.update(id, {
      ...updatePetDto,
      photoUrls: finalPhotoUrls,
    });
    return await this.findOne(id);
  }

  async removeById(id: string): Promise<{ message: string }> {
    const pet = await this.petRepository.findOne({
      where: { id, isActive: true },
    });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    await this.petRepository.update(id, { isActive: false });
    await this.matchRepository.delete({ petId: pet.id });
    return { message: `Mascota con ID ${id} eliminada exitosamente` };
  }

  async findCompatiblePetsByUserId(
    userId: string,
    queryParams: GetPetsQueryDto,
  ): Promise<{
    items: Pet[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, ...filterParams } = queryParams;
    const skip = (page - 1) * limit;

    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
      relations: ['adopter'],
    });

    if (!user || !user.adopter) {
      throw new NotFoundException(
        `Usuario con ID ${userId} no encontrado o no es un adoptante`,
      );
    }

    const adopter = user.adopter;

    if (!adopter.allowsPets) {
      throw new ConflictException(
        `El edificio o condominio del adoptante no permite mascotas en su hogar`,
      );
    }

    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .where('pet.isActive = :isActive', { isActive: true })
      .andWhere('pet.status = :status', { status: PetStatus.AVAILABLE });

    if (adopter.userPreferenceChildren) {
      queryBuilder.andWhere(':childFriendly = ANY(pet.traits)', {
        childFriendly: PetTrait.CHILD_FRIENDLY,
      });
    }

    if (adopter.userPreferenceDogs || adopter.userPreferenceCats) {
      queryBuilder.andWhere(':petFriendly = ANY(pet.traits)', {
        petFriendly: PetTrait.PET_FRIENDLY,
      });
    }

    if (adopter.hoursAlone >= 4) {
      queryBuilder.andWhere(
        '(pet.energy = :moderateEnergy OR pet.energy = :calmEnergy OR :independent = ANY(pet.traits))',
        {
          moderateEnergy: PetEnergy.MODERATE,
          calmEnergy: PetEnergy.CALM,
          independent: PetTrait.INDEPENDENT,
        },
      );
    }

    if (adopter.hoursAlone >= 8) {
      queryBuilder.andWhere(
        '(pet.energy = :calmEnergy OR :independent = ANY(pet.traits))',
        {
          calmEnergy: PetEnergy.CALM,
          independent: PetTrait.INDEPENDENT,
        },
      );
    }

    if (adopter.homeType === AdopterHomeType.SMALL_APARTMENT) {
      queryBuilder.andWhere(
        '(pet.size = :smallSize OR pet.size = :mediumSize)',
        {
          smallSize: PetSize.SMALL,
          mediumSize: PetSize.MEDIUM,
        },
      );
    }

    if (!adopter.hadPets) {
      queryBuilder.andWhere(
        '(:easygoing = ANY(pet.traits) OR :adaptable = ANY(pet.traits))',
        {
          easygoing: PetTrait.PLAYFUL,
          adaptable: PetTrait.INDEPENDENT,
        },
      );
    }

    if (!adopter.preparedToVisitVeterinarian) {
      queryBuilder.andWhere('pet.isVaccinated = :isVaccinated', {
        isVaccinated: true,
      });
      queryBuilder.andWhere('pet.isDewormed = :isDewormed', {
        isDewormed: true,
      });
    }

    if (filterParams) {
      if (filterParams.species) {
        queryBuilder.andWhere('pet.species = :species', {
          species: filterParams.species,
        });
      }
      if (filterParams.size) {
        queryBuilder.andWhere('pet.size = :size', { size: filterParams.size });
      }
      if (filterParams.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filterParams.age });
      }
      if (filterParams.sex) {
        queryBuilder.andWhere('pet.sex = :sex', { sex: filterParams.sex });
      }
      if (filterParams.energy) {
        queryBuilder.andWhere('pet.energy = :energy', {
          energy: filterParams.energy,
        });
      }
      if (filterParams.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', {
          breed: `%${filterParams.breed}%`,
        });
      }

      if (filterParams.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search OR pet.story ILIKE :search)',
          { search: `%${filterParams.search}%` },
        );
      }
    }

    const [pets, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const compatibilityScore: Record<string, number> = {};

    for (const pet of pets) {
      let score = 0;
      const maxScore = 100;

      if (adopter.userPreferenceChildren) {
        if (pet.traits.includes(PetTrait.CHILD_FRIENDLY)) {
          score += 20;
        }
      } else {
        score += 20;
      }

      if (adopter.userPreferenceDogs || adopter.userPreferenceCats) {
        if (pet.traits.includes(PetTrait.PET_FRIENDLY)) {
          score += 15;
        }
      } else {
        score += 15;
      }

      if (adopter.hoursAlone >= 8) {
        if (
          pet.energy === PetEnergy.CALM ||
          pet.traits.includes(PetTrait.INDEPENDENT)
        ) {
          score += 15;
        }
      } else if (adopter.hoursAlone >= 4) {
        if (
          pet.energy === PetEnergy.CALM ||
          pet.energy === PetEnergy.MODERATE ||
          pet.traits.includes(PetTrait.INDEPENDENT)
        ) {
          score += 15;
        }
      } else {
        score += 15;
      }

      if (adopter.homeType === AdopterHomeType.SMALL_APARTMENT) {
        if (pet.size === PetSize.SMALL) {
          score += 15;
        } else if (pet.size === PetSize.MEDIUM) {
          score += 10;
        }
      } else if (adopter.homeType === AdopterHomeType.BIG_APARTMENT) {
        if (pet.size === PetSize.SMALL || pet.size === PetSize.MEDIUM) {
          score += 15;
        } else if (pet.size === PetSize.LARGE) {
          score += 10;
        }
      } else if (adopter.homeType === AdopterHomeType.BIG_HOUSE) {
        if (pet.size !== PetSize.EXTRA_LARGE) {
          score += 15;
        } else {
          score += 10;
        }
      } else {
        score += 15;
      }

      if (adopter.hadPets) {
        score += 10;
      } else {
        if (
          pet.traits.includes(PetTrait.PLAYFUL) ||
          pet.traits.includes(PetTrait.INDEPENDENT)
        ) {
          score += 10;
        } else {
          score += 5;
        }
      }

      if (pet.isVaccinated && pet.isDewormed) {
        score += 5;
      }
      if (pet.isSterilized) {
        score += 5;
      }

      if (adopter.hoursAlone < 4 && pet.energy === PetEnergy.VERY_ACTIVE) {
        score += 15;
      } else if (
        adopter.hoursAlone >= 4 &&
        adopter.hoursAlone < 8 &&
        pet.energy === PetEnergy.MODERATE
      ) {
        score += 15;
      } else if (adopter.hoursAlone >= 8 && pet.energy === PetEnergy.CALM) {
        score += 15;
      } else {
        score += 7;
      }

      compatibilityScore[pet.id] = Math.min(Math.round(score), maxScore);
    }

    const sortedPets = pets.sort(
      (a, b) =>
        (compatibilityScore[b.id] || 0) - (compatibilityScore[a.id] || 0),
    );

    return {
      items: sortedPets,
      total,
      limit: +limit,
      page: +page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
