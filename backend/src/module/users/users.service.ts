import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { QueryUsersDto } from './dtos/query-user.dto';
import { use } from 'passport';
import { mapAdopter } from '../auth/utils/auth.utils';
import { AdoptersService } from '../adopters/adopters.service';
import { RegisterDto } from '../auth/dtos/register.dto';
import { Adopters } from '../adopters/entities/adopters.entity';
import { CreateAdopterDto } from '../adopters/dtos/create-adopter.dto';
import { UserRole } from 'src/common/enums/userRole.enum';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly adoptersService: AdoptersService,
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

    const where: any = { role: 'adoptante' };
    if (filters.fullname) where.fullname = Like(`%${filters.fullname}%`);
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
        adopter: true,
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
  }

  // async restore(id: string) {
  //   const user = await this.findOneById(id);
  //   if (user.isActive)
  //     throw new BadRequestException('El usuario ya esta activo');

  //   await this.userRepository.update(id, { isActive: true });

  //   return { message: 'Usuario activado correctamente' };
  // }

  async remove(id: string) {
    const user = await this.findOneById(id);
    if (!user.isActive)
      throw new BadRequestException('El usuario ya está eliminado');

    if (user.role === UserRole.ADMIN)
      throw new BadRequestException(
        'No se puede eliminar la cuenta de un administrador',
      );

    await this.userRepository.update(id, { isActive: false });

    return {
      message: 'La cuenta del usuario ha sido eliminada exitosamente',
    };
  }

  async updateUserById(id: string, updateUserDto) {
    const user = await this.userRepository.findOne({where: {id}, relations: ['adopter']});
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }  
    const{fullname, email, password, ...adopterdto}= updateUserDto;

    const userUpdated = await this.userRepository.update(id, {fullname, email, password} );
    if(userUpdated.affected === 0){
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    if(user.role === 'adoptante' && user.adopter?.id && adopterdto){
      const adopterData = mapAdopter(adopterdto, user);
      await this.adoptersService.updateAdopter(user.adopter.id, {...adopterData, id:user.adopter.id});
    }
    return this.userRepository.findOne({where:{id}, relations: ['adopter'], select: {
      id: true,
      fullname: true,
      email: true,
      role: true,
      isActive: true,
    }});
  }
}
