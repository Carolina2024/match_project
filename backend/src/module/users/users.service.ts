import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { QueryUsersDto } from './dtos/query-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashtedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userData = this.userRepository.create({
      ...createUserDto,
      password: hashtedPassword,
    });

    return this.userRepository.save(userData);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findAll(query: QueryUsersDto) {
    const { page = 1, limit = 10, ...filters } = query;

    const where: any = {};
    if (filters.fullname) where.fullname = Like(`%${filters.fullname}%`);
    if (filters.role) where.role = filters.role;
    if (filters.email) where.email = Like(`%${filters.email}%`);
    if (filters.isActive) where.isActive = filters.isActive;

    const [users, total] = await this.userRepository.findAndCount({
      where,
      relations: ['adopter'],
      take: limit,
      skip: (page - 1) * limit,
      order: { fullname: 'ASC' },
      select: {
        email: true,
        fullname: true,
        id: true,
        isActive: true,
        role: true,
      },
    });

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findOneById(id: string): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['adopter'],
        select: {
          id: true,
          fullname: true,
          email: true,
          role: true,
          isActive: true,
        },
      });
      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }
}
