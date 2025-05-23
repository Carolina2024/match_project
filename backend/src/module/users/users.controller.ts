import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/userRole.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  DeleteUserDocs,
  GetAllUsersDocs,
  GetUserByIdDocs,
  UpdateUserByIdDocs,
} from './users.controller.docs';
import { OwnerOrAdminAuth } from '../auth/decorators/owner-or-admin-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(UserRole.ADMIN)
  @GetAllUsersDocs()
  getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @OwnerOrAdminAuth()
  @GetUserByIdDocs()
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch(':id')
  @OwnerOrAdminAuth()
  @UpdateUserByIdDocs()
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @DeleteUserDocs()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeById(id);
  }
}
