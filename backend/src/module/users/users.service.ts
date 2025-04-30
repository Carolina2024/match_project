import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { register } from 'module';

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
}
