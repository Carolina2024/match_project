/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { AdoptersService } from '../adopters/adopters.service';
import { UserRole } from 'src/common/enums/userRole.enum';
import { PaginationInterface } from 'src/common/interfaces/pagination.interface';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Match } from '../matches/entities/match.entity';
import { MatchStatus } from 'src/common/enums/match-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly adoptersService: AdoptersService,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
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
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });
    return user;
  }

  async findAll(query: GetUsersQueryDto): Promise<PaginationInterface<Users>> {
    const { page = 1, limit = 10, ...filters } = query;

    const where: any = { role: UserRole.ADOPTERS, isActive: true };
    if (filters.fullname) where.fullname = Like(`%${filters.fullname}%`);
    if (filters.email) where.email = Like(`%${filters.email}%`);

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
        isActive: false,
        role: true,
        adopter: true,
        createdAt: true,
      },
    });

    return {
      items: users,
      total,
      page: +page,
      limit: +limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findOneById(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['adopter'],
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        isActive: false,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async removeById(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['adopter'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    if (user.role === UserRole.ADMIN)
      throw new BadRequestException(
        'No se puede eliminar la cuenta de un administrador',
      );

    await this.userRepository.update(id, { isActive: false });

    await this.matchRepository.delete({ userId: user.id });

    return {
      message: 'La cuenta del usuario ha sido eliminada exitosamente',
    };
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['adopter'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const { fullname, email, password, ...adopterdto } = updateUserDto;

    if (email && email !== user.email) {
      const userExists = await this.findByEmail(email);
      if (userExists)
        throw new ConflictException('Ya existe un usuario con ese correo');
    }

    let newPassword = password;
    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }

    if (fullname || email || password) {
      const userUpdated = await this.userRepository.update(id, {
        fullname,
        email,
        password: newPassword,
      });
      if (userUpdated.affected === 0) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }
    }

    if (user.role === UserRole.ADOPTERS && user.adopter?.id && adopterdto) {
      if (
        adopterdto.identityDocument &&
        user.adopter.identityDocument !== adopterdto.identityDocument
      ) {
        const userExists = await this.adoptersService.findByIdentityDocument(
          adopterdto.identityDocument,
        );
        if (userExists) {
          throw new ConflictException(
            'Ya existe un usuario con ese Documento de Identidad',
          );
        }
      }
      await this.adoptersService.updateById(user.adopter.id, {
        ...adopterdto,
        id: user.adopter.id,
      });
    }
    return this.userRepository.findOne({
      where: { id },
      relations: ['adopter'],
      select: {
        id: true,
        fullname: true,
        email: true,
        role: true,
        isActive: false,
      },
    });
  }
  async updatePasswordById(
    id: string,
    newHashedPassword: string,
  ): Promise<void> {
    const result = await this.userRepository.update(id, {
      password: newHashedPassword,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }
  async findPetsByUserId(userId: string) {
    const user = await this.findOneById(userId);

    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    const matches = await this.matchRepository.find({
      where: {
        userId: userId,
        status: MatchStatus.APROBADO,
      },
      relations: ['pet'],
    });

    const pets = matches.map((match) => match.pet);

    return pets;
  }
}
