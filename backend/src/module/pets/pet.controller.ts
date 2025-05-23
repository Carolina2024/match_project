import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/userRole.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiExtraModels } from '@nestjs/swagger';
import { GetPetsQueryDto } from './dto/get-pets-query.dto';
import {
  CreatePetDocs,
  DeletePetDocs,
  GetAllPetsDocs,
  GetAllPetsLimitedDocs,
  GetCompatiblePetsByUserDocs,
  GetPetByIdDocs,
  UpdatePetDocs,
} from './pet.controller.docs';

@ApiTags('Mascotas')
@ApiExtraModels(UpdatePetDto)
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('photos'))
  @HttpCode(HttpStatus.CREATED)
  @CreatePetDocs()
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPetDto: CreatePetDto,
  ) {
    try {
      return this.petService.create(createPetDto, files);
    } catch (error) {
      throw new BadRequestException('Error al crear la mascota ' + error);
    }
  }

  @Get()
  @GetAllPetsLimitedDocs()
  findAllLimited(@Query() queryParams: GetPetsQueryDto) {
    return this.petService.findAllLimited(queryParams);
  }

  @Get('complete')
  @Auth(UserRole.ADMIN)
  @GetAllPetsDocs()
  findAll(@Query() queryParams: GetPetsQueryDto) {
    return this.petService.findAll(queryParams);
  }

  @Get('users/:userId')
  @Auth(UserRole.ADOPTERS)
  @GetCompatiblePetsByUserDocs()
  findCompatible(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() queryParams: GetPetsQueryDto,
  ) {
    return this.petService.findCompatiblePetsByUserId(userId, queryParams);
  }

  @Get(':id')
  @Auth()
  @GetPetByIdDocs()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('photos'))
  @UpdatePetDocs()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.petService.updateById(id, updatePetDto, files);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN)
  @DeletePetDocs()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.removeById(id);
  }
}
