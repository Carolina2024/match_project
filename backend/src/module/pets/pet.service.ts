import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PetFilterDto } from './dto/pet-filter.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create(createPetDto);
    return await this.petRepository.save(pet);
  }

  async findAll(paginationDto: PaginationDto, filterDto?: PetFilterDto): Promise<{ items: Pet[], total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.petRepository.createQueryBuilder('pet')
      .where('pet.isActive = :isActive', { isActive: true });

    if (filterDto) {
      if (filterDto.species) {
        queryBuilder.andWhere('pet.species = :species', { species: filterDto.species });
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
        queryBuilder.andWhere('pet.energy = :energy', { energy: filterDto.energy });
      }
      if (filterDto.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', { breed: `%${filterDto.breed}%` });
      }
      
      if (filterDto.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search OR pet.story ILIKE :search)',
          { search: `%${filterDto.search}%` }
        );
      }
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }

  async findAllLimited(paginationDto: PaginationDto, filterDto?: PetFilterDto): Promise<{ items: Partial<Pet>[], total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.petRepository.createQueryBuilder('pet')
      .select(['pet.id', 'pet.name', 'pet.isActive', 'pet.photoUrls'])
      .where('pet.isActive = :isActive', { isActive: true });
  
    if (filterDto) {
      if (filterDto.species) {
        queryBuilder.andWhere('pet.species = :species', { species: filterDto.species });
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
        queryBuilder.andWhere('pet.energy = :energy', { energy: filterDto.energy });
      }
      if (filterDto.breed) {
        queryBuilder.andWhere('pet.breed ILIKE :breed', { breed: `%${filterDto.breed}%` });
      }
      
      if (filterDto.search) {
        queryBuilder.andWhere(
          '(pet.name ILIKE :search OR pet.breed ILIKE :search)',
          { search: `%${filterDto.search}%` }
        );
      }
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id, isActive: true } });
    if (!pet) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada o no está activa`);
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return await this.petRepository.save(pet);
  }

  async remove(id: string): Promise<void> {
    const result = await this.petRepository.update(id, { isActive: false });
    if (result.affected === 0) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
  }

  async findCompatiblePets(userId: string, paginationDto: PaginationDto, filterDto: PetFilterDto): Promise<{ items: Pet[], total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    
    const queryBuilder = this.petRepository.createQueryBuilder('pet')
      .where('pet.isActive = :isActive', { isActive: true });
    
    
    if (PetFilterDto && PetFilterDto.search) {
      queryBuilder.andWhere(
        '(pet.name ILIKE :search OR pet.breed ILIKE :search OR pet.story ILIKE :search)',
        { search: `%${PetFilterDto.search}%` }
      );
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }
}