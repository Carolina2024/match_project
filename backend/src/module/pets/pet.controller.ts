import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PetFilterDto } from './dto/pet-filter.dto';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get()
  findAllLimited(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: PetFilterDto
  ) {
    return this.petService.findAllLimited(paginationDto, filterDto);
  }

  @Get('complete')
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: PetFilterDto
  ) {
    return this.petService.findAll(paginationDto, filterDto);
  }

  @Get('users/:userId')
  findCompatible(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: PetFilterDto
  ) {
    return this.petService.findCompatiblePets(userId, paginationDto, filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updatePetDto: UpdatePetDto
  ) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.remove(id);
  }
}