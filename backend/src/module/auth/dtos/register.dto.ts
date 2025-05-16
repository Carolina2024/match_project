import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { CreateAdopterDto } from '../../adopters/dtos/create-adopter.dto';
import { IntersectionType } from '@nestjs/swagger';

export class RegisterDto extends IntersectionType(
  CreateUserDto,
  CreateAdopterDto,
) {}
