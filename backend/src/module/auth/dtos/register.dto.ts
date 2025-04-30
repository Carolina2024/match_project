import { IntersectionType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { CreateAdopterDto } from '../../adopters/dtos/create-adopter.dto';
import { IsEnum } from "class-validator";
import { UserRole } from "src/common/enums/userRole.enum";

export class RegisterDto extends IntersectionType ( CreateUserDto, PartialType(CreateAdopterDto) ) {

    @IsEnum(UserRole, { message: 'El rol debe ser admin o adoptante'})
    role: UserRole;
}