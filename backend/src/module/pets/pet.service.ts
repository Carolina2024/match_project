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
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PetFilterDto } from './dto/pet-filter.dto';
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

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private readonly filesService: FilesService,
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
    paginationDto: PaginationDto,
    filterDto?: PetFilterDto,
  ): Promise<PaginationInterface<Pet>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .select([
        'pet.id',
        'pet.name',
        'pet.size',
        'pet.sex',
        'pet.age',
        'pet.species',
        'pet.energy',
        'pet.breed',
        'pet.kg',
        'pet.isVaccinated',
        'pet.isSterilized',
        'pet.isDewormed',
        'pet.hasMicrochip',
        'pet.story',
        'pet.traits',
        'pet.admissionDate',
        'pet.photoUrls',
        'pet.status',
      ])
      .where('pet.isActive = :isActive', { isActive: true });

    if (filterDto) {
      if (filterDto.species) {
        queryBuilder.andWhere('pet.species = :species', {
          species: filterDto.species,
        });
      }
      if (filterDto.size) {
        queryBuilder.andWhere('pet.size = :size', { size: filterDto.size });
      }
      if (filterDto.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filterDto.age });
      }
      if (filterDto.sex) {
        queryBuilder.andWhere('pet.sex = :sex', { sex: filterDto.sex });
      }
      if (filterDto.energy) {
        queryBuilder.andWhere('pet.energy = :energy', {
          energy: filterDto.energy,
        });
      }
      if (filterDto.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', {
          breed: `%${filterDto.breed}%`,
        });
      }
      if (filterDto.status) {
        queryBuilder.andWhere('pet.status ILIKE :status', {
          status: `%${filterDto.status}%`,
        });
      }

      if (filterDto.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search OR pet.story ILIKE :search)',
          { search: `%${filterDto.search}%` },
        );
      }
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
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
    paginationDto: PaginationDto,
    filterDto?: PetFilterDto,
  ): Promise<PaginationInterface<Partial<Pet>>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .select(['pet.id', 'pet.name', 'pet.photoUrls'])
      .where('pet.isActive = :isActive', { isActive: true });

    if (filterDto) {
      if (filterDto.species) {
        queryBuilder.andWhere('pet.species = :species', {
          species: filterDto.species,
        });
      }
      if (filterDto.size) {
        queryBuilder.andWhere('pet.size = :size', { size: filterDto.size });
      }
      if (filterDto.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filterDto.age });
      }
      if (filterDto.sex) {
        queryBuilder.andWhere('pet.sex = :sex', { sex: filterDto.sex });
      }
      if (filterDto.energy) {
        queryBuilder.andWhere('pet.energy = :energy', {
          energy: filterDto.energy,
        });
      }
      if (filterDto.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', {
          breed: `%${filterDto.breed}%`,
        });
      }
      if (filterDto.status) {
        queryBuilder.andWhere('pet.status ILIKE :status', {
          status: `%${filterDto.status}%`,
        });
      }

      if (filterDto.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search)',
          { search: `%${filterDto.search}%` },
        );
      }
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
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
      // select: {
      //   id: true,
      //   name: true,
      //   size: true,
      //   birthDate: true,
      //   sex: true,
      //   age: true,
      //   species: true,
      //   energy: true,
      //   breed: true,
      //   kg: true,
      //   isVaccinated: true,
      //   isSterilized: true,
      //   isDewormed: true,
      //   hasMicrochip: true,
      //   story: true,
      //   traits: true,
      //   admissionDate: true,
      //   photoUrls: true,
      //   status: true,
      // },
    });
    if (!pet) {
      throw new NotFoundException(
        `Mascota con ID ${id} no encontrada o no está activa`,
      );
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto, files: Express.Multer.File[]): Promise<Pet> {

     if (files.length > 3) {
      throw new BadRequestException('No se pueden subir más de 3 imágenes');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException('Solo se permiten imágenes JPG/JPEG/PNG');
      }
      if(file.size > 5*1024*1024){
        throw new BadRequestException('La imagen debe pesar menos de 5MB');
      }
    }
    let newPhotoUrls: string[] = [];

    // Subir y transformar imágenes en Cloudinary
    if (files.length > 0) {
      newPhotoUrls = await Promise.all(
        files.map((file) =>
          this.filesService.uploadImageToCloudinary(file),
        ),
      );
    }
    // Combinar imágenes subidas y URLs recibidas 
    const finalPhotoUrls = [
      ...(updatePetDto.photoUrls || []),
      ...newPhotoUrls,
    ].slice(0, 3); // limitar a máximo 3
  
    await this.petRepository.update(id, {
      ...updatePetDto,
      photoUrls: finalPhotoUrls,
    });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.petRepository.update(id, { isActive: false });
    if (result.affected === 0) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return { message: `Mascota con ID ${id} eliminada exitosamente` };
  }

  async findCompatiblePets(
    userId: string,
    paginationDto: PaginationDto,
    filterDto?: PetFilterDto,
  ): Promise<{
    items: Pet[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    compatibilityScore?: Record<string, number>;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Primero obtenemos la información del adoptante
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['adopter'],
    });

    if (!user || !user.adopter) {
      throw new NotFoundException(
        `Usuario con ID ${userId} no encontrado o no es un adoptante`,
      );
    }

    const adopter = user.adopter;

    // Si el adoptante no permite mascotas, no mostrar ninguna (esto debería ser validado antes)
    if (!adopter.allowsPets) {
      throw new ConflictException(
        `El edificio o condominio del adoptante no permite mascotas en su hogar`,
      );
    }

    const queryBuilder = this.petRepository
      .createQueryBuilder('pet')
      .where('pet.isActive = :isActive', { isActive: true })
      .andWhere('pet.status = :status', { status: PetStatus.AVAILABLE });

    // Filtros basados en las características del adoptante

    // ===== FILTROS DE COMPATIBILIDAD CRÍTICOS =====

    // Si el adoptante desea compatibilidad con niños, solo mostrar mascotas amigables con niños
    if (adopter.userPreferenceChildren) {
      queryBuilder.andWhere(':childFriendly = ANY(pet.traits)', {
        childFriendly: PetTrait.CHILD_FRIENDLY,
      });
    }

    // Si el adoptante desea compatibilidad con perros o gatos, solo mostrar mascotas amigables con otras mascotas
    if (adopter.userPreferenceDogs || adopter.userPreferenceCats) {
      queryBuilder.andWhere(':petFriendly = ANY(pet.traits)', {
        petFriendly: PetTrait.PET_FRIENDLY,
      });
    }

    // Si la mascota pasará 4 o más horas sola, mostrar mascotas con energía moderada o tranquila, o independientes
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

    // Si la mascota pasará 8 o más horas sola, solo mostrar mascotas tranquilas o independientes
    if (adopter.hoursAlone >= 8) {
      queryBuilder.andWhere(
        '(pet.energy = :calmEnergy OR :independent = ANY(pet.traits))',
        {
          calmEnergy: PetEnergy.CALM,
          independent: PetTrait.INDEPENDENT,
        },
      );
    }

    // ===== FILTROS PARA TIPO DE VIVIENDA =====

    // Para departamentos pequeños, limitar el tamaño de las mascotas
    if (adopter.homeType === AdopterHomeType.SMALL_APARTMENT) {
      queryBuilder.andWhere(
        '(pet.size = :smallSize OR pet.size = :mediumSize)',
        {
          smallSize: PetSize.SMALL,
          mediumSize: PetSize.MEDIUM,
        },
      );
    }

    // ===== FILTROS BASADOS EN EXPERIENCIA DEL ADOPTANTE =====

    // Si el adoptante no ha tenido mascotas antes, sugerir mascotas más fáciles de cuidar
    if (!adopter.hadPets) {
      queryBuilder.andWhere(
        '(:easygoing = ANY(pet.traits) OR :adaptable = ANY(pet.traits))',
        {
          easygoing: PetTrait.PLAYFUL,
          adaptable: PetTrait.INDEPENDENT,
        },
      );
    }

    // ===== FILTROS BASADOS EN RESPONSABILIDAD DEL ADOPTANTE =====

    // Si el adoptante no tiene veterinario o no lo llevará al veterinario, priorizar mascotas saludables, vacunadas o esterilizadas
    if (!adopter.preparedToVisitVeterinarian) {
      queryBuilder.andWhere('pet.isVaccinated = :isVaccinated', {
        isVaccinated: true,
      });
      queryBuilder.andWhere('pet.isDewormed = :isDewormed', {
        isDewormed: true,
      });
    }

    // Aplicar filtros adicionales si se proporcionan en el DTO
    if (filterDto) {
      if (filterDto.species) {
        queryBuilder.andWhere('pet.species = :species', {
          species: filterDto.species,
        });
      }
      if (filterDto.size) {
        queryBuilder.andWhere('pet.size = :size', { size: filterDto.size });
      }
      if (filterDto.age) {
        queryBuilder.andWhere('pet.age = :age', { age: filterDto.age });
      }
      if (filterDto.sex) {
        queryBuilder.andWhere('pet.sex = :sex', { sex: filterDto.sex });
      }
      if (filterDto.energy) {
        queryBuilder.andWhere('pet.energy = :energy', {
          energy: filterDto.energy,
        });
      }
      if (filterDto.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', {
          breed: `%${filterDto.breed}%`,
        });
      }

      if (filterDto.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search OR pet.story ILIKE :search)',
          { search: `%${filterDto.search}%` },
        );
      }
    }

    const [pets, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Calcular puntuación de compatibilidad para cada mascota
    const compatibilityScore: Record<string, number> = {};

    for (const pet of pets) {
      let score = 0;
      const maxScore = 100;

      // Factores de compatibilidad con ponderaciones

      // 1. Compatibilidad con niños (20 puntos)
      if (adopter.userPreferenceChildren) {
        if (pet.traits.includes(PetTrait.CHILD_FRIENDLY)) {
          score += 20;
        }
      } else {
        score += 20; // Si no hay niños, no es un factor limitante
      }

      // 2. Compatibilidad con otras mascotas (15 puntos)
      if (adopter.userPreferenceDogs || adopter.userPreferenceCats) {
        if (pet.traits.includes(PetTrait.PET_FRIENDLY)) {
          score += 15;
        }
      } else {
        score += 15; // Si no hay otras mascotas, no es un factor limitante
      }

      // 3. Compatibilidad con tiempo solo (15 puntos)
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
        score += 15; // Si la mascota no estará sola mucho tiempo, no es un factor limitante
      }

      // 4. Compatibilidad con tipo de vivienda (15 puntos)
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
        score += 15; // Para casas, cualquier tamaño es adecuado
      }

      // 5. Experiencia con mascotas (10 puntos)
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

      // 6. Estado de salud y cuidados (10 puntos)
      if (pet.isVaccinated && pet.isDewormed) {
        score += 5;
      }
      if (pet.isSterilized) {
        score += 5;
      }

      // 7. Energía de la mascota vs estilo de vida (15 puntos)
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
        score += 7; // Compatibilidad parcial
      }

      // Guardar puntuación normalizada (0-100)
      compatibilityScore[pet.id] = Math.min(Math.round(score), maxScore);
    }

    // Ordenar mascotas por puntuación de compatibilidad (de mayor a menor)
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
      compatibilityScore,
    };
  }
}
