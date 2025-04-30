import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { register } from 'module';
import { QueryUsersDto } from './dtos/query-user.dto';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly  userRepository: Repository<Users>
     ){}

     async create (createUserDto: CreateUserDto): Promise<Users> {
        const hashtedPassword = await bcrypt.hash(createUserDto.password, 10);
        const userData = this.userRepository.create({
         ...createUserDto,
         password:hashtedPassword
        });
       
        return this.userRepository.save(userData);
     }

     async findByEmail(email:string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
     }

     async findAll(query: QueryUsersDto) {
      const { page = 1, limit = 10, fullname, isActive } = query;
  
      const where: any = {};
      if (fullname) where.fullname = Like(`%${fullname}%`);
      if (isActive !== undefined) where.isActive = isActive === 'true';
  
      const [users, total] = await this.userRepository.findAndCount({
        where,
        take: limit,
        skip: (page - 1) * limit,
        order: { fullname: 'ASC' },
      });
  
      return {
        data: users,
        total,
        page,
        limit,
      };
    }
      async findOneById(id: string): Promise<Users> {
         const user = await this.userRepository.findOne({ where: { id } });
         if (!user) {
         throw new NotFoundException(`Usuario con id ${id} no encontrado`);
         }
         return user;
      }
}
