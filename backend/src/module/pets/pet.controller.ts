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
  HttpCode
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PetFilterDto } from './dto/pet-filter.dto';
import { 
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiParam, 
  ApiQuery, 
  ApiBody 
} from '@nestjs/swagger';
import { Pet } from './entities/pet.entity';
import { UserRole } from 'src/common/enums/userRole.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Mascotas')
@ApiBearerAuth()
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva mascota', description: 'Crea un nuevo registro de mascota en el sistema' })
  @ApiBody({ type: CreatePetDto, description: 'Datos de la mascota a crear' })
  @ApiCreatedResponse({ description: 'La mascota ha sido creada exitosamente', type: Pet })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Auth(UserRole.ADMIN)
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener lista de mascotas con información limitada', description: 'Retorna una lista paginada de mascotas con información básica' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de elementos por página', type: Number })
  @ApiQuery({ name: 'search', required: false, description: 'Término de búsqueda', type: String })
  @ApiOkResponse({ description: 'Lista de mascotas obtenida exitosamente' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  findAllLimited(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: PetFilterDto
  ) {
    return this.petService.findAllLimited(paginationDto, filterDto);
  }

  @Get('complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener lista completa de mascotas', description: 'Retorna una lista paginada de mascotas con toda su información' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de elementos por página', type: Number })
  @ApiQuery({ name: 'search', required: false, description: 'Término de búsqueda', type: String })
  @ApiOkResponse({ description: 'Lista completa de mascotas obtenida exitosamente' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Auth(UserRole.ADMIN)
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: PetFilterDto
  ) {
    return this.petService.findAll(paginationDto, filterDto);
  }

  @Get('users/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener mascotas compatibles para un usuario', description: 'Retorna una lista de mascotas que son compatibles con el usuario especificado' })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: String })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de elementos por página', type: Number })
  @ApiOkResponse({ description: 'Lista de mascotas compatibles obtenida exitosamente' })
  @ApiBadRequestResponse({ description: 'ID de usuario inválido' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Auth(UserRole.ADOPTERS)
  findCompatible(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: PetFilterDto
  ) {
    return this.petService.findCompatiblePets(userId, paginationDto, filterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una mascota por ID', description: 'Retorna los detalles de una mascota específica' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiOkResponse({ description: 'Mascota encontrada exitosamente', type: Pet })
  @ApiBadRequestResponse({ description: 'ID de mascota inválido' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiNotFoundResponse({ description: 'Mascota no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una mascota', description: 'Actualiza los datos de una mascota existente' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiBody({ type: UpdatePetDto, description: 'Datos de la mascota a actualizar' })
  @ApiOkResponse({ description: 'Mascota actualizada exitosamente', type: Pet })
  @ApiBadRequestResponse({ description: 'Datos de entrada o ID inválidos' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiNotFoundResponse({ description: 'Mascota no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  @Auth(UserRole.ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updatePetDto: UpdatePetDto
  ) {
    return this.petService.update(id, updatePetDto);
  }
  @Auth(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una mascota', description: 'Realiza una eliminación lógica de una mascota' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiOkResponse({ description: 'Mascota eliminada exitosamente' })
  @ApiBadRequestResponse({ description: 'ID de mascota inválido' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  @ApiNotFoundResponse({ description: 'Mascota no encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Error interno del servidor' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.remove(id);
  }
}