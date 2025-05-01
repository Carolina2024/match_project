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
  ApiBody, 
  ApiForbiddenResponse
} from '@nestjs/swagger';
import { Pet } from './entities/pet.entity';
import { UserRole } from 'src/common/enums/userRole.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { PetAge, PetEnergy, PetSex, PetSize, PetSpecies, PetStatus } from 'src/common/enums/pet.enum';

@ApiTags('Mascotas')
@ApiBearerAuth()
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva mascota', description: 'Crea un nuevo registro de mascota en el sistema' })
  @ApiBody({ type: CreatePetDto, description: 'Datos de la mascota a crear' })
  @ApiCreatedResponse({ 
    description: 'La mascota ha sido creada exitosamente', 
    type: Pet,
    example: {
      id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
      name: 'Firulais',
      species: 'perro',
      breed: 'Mestizo',
      age: 'adulto',
      size: 'mediano',
      sex: 'macho',
      energy: 'alta',
      kg: 15.5,
      isVaccinated: true,
      isSterilized: true,
      isDewormed: true,
      hasMicrochip: false,
      story: 'Fue rescatado de la calle hace 2 meses.',
      traits: ['cariñoso', 'juguetón'],
      status: 'disponible',
      isActive: true,
      photoUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ],
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z'
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Datos de entrada inválidos',
    example: {
      message: [
        'El nombre debe ser una cadena de texto',
        'El tamaño debe ser un valor válido',
        'La fecha de nacimiento debe ser una fecha válida'
      ],
      error: 'Bad Request',
      statusCode: 400,
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    }
  })
  @ApiForbiddenResponse({
    description: 'Usuario sin permisos para acceder al recurso',
    example: {
      message: 'Usuario sin permisos suficientes',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Error interno del servidor',
    example: {
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  })
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
  @ApiQuery({ name: 'species', required: false, description: 'Filtrar por especie', enum: PetSpecies })
  @ApiQuery({ name: 'size', required: false, description: 'Filtrar por tamaño', enum: PetSize })
  @ApiQuery({ name: 'age', required: false, description: 'Filtrar por edad', enum: PetAge })
  @ApiQuery({ name: 'sex', required: false, description: 'Filtrar por sexo', enum: PetSex })
  @ApiQuery({ name: 'energy', required: false, description: 'Filtrar por nivel de energía', enum: PetEnergy })
  @ApiQuery({ name: 'breed', required: false, description: 'Filtrar por raza', type: String })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por el estado en el que se encuentra la mascota', enum: PetStatus })
  @ApiOkResponse({ 
    description: 'Lista de mascotas obtenida exitosamente',
    example: {
      items: [
        {
          id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
          name: 'Firulais',
          isActive: true,
          photoUrls: ['https://example.com/image1.jpg']
        },
        {
          id: '739dcdc7-a635-48d4-a641-2c74d0878bbe',
          name: 'Luna',
          isActive: true,
          photoUrls: ['https://example.com/image2.jpg']
        }
      ],
      total: 2
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    }
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Error interno del servidor',
    example: {
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  })
  findAllLimited(
    @Query() queryParams
  ) {
    const { page, limit, ...filterParams } = queryParams;
    return this.petService.findAllLimited({ page, limit }, filterParams);
  }
  @Get('complete')
  @ApiOperation({ summary: 'Obtener lista completa de mascotas', description: 'Retorna una lista paginada de mascotas con toda su información' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de elementos por página', type: Number })
  @ApiQuery({ name: 'search', required: false, description: 'Término de búsqueda', type: String })
  @ApiQuery({ name: 'species', required: false, description: 'Filtrar por especie', enum: PetSpecies })
  @ApiQuery({ name: 'size', required: false, description: 'Filtrar por tamaño', enum: PetSize })
  @ApiQuery({ name: 'age', required: false, description: 'Filtrar por edad', enum: PetAge })
  @ApiQuery({ name: 'sex', required: false, description: 'Filtrar por sexo', enum: PetSex })
  @ApiQuery({ name: 'energy', required: false, description: 'Filtrar por nivel de energía', enum: PetEnergy })
  @ApiQuery({ name: 'breed', required: false, description: 'Filtrar por raza', type: String })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por el estado en el que se encuentra la mascota', enum: PetStatus })
  @ApiOkResponse({ 
    description: 'Lista completa de mascotas obtenida exitosamente',
    example: {
      items: [
        {
          id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
          name: 'Firulais',
          species: 'perro',
          breed: 'Mestizo',
          age: 'adulto',
          size: 'mediano',
          sex: 'macho',
          energy: 'alta',
          kg: 15.5,
          isVaccinated: true,
          isSterilized: true,
          isDewormed: true,
          hasMicrochip: false,
          story: 'Fue rescatado de la calle hace 2 meses.',
          traits: ['cariñoso', 'juguetón'],
          status: 'disponible',
          isActive: true,
          photoUrls: ['https://example.com/image1.jpg'],
          createdAt: '2023-05-15T10:30:00Z',
          updatedAt: '2023-05-15T10:30:00Z'
        },
        {
          id: '739dcdc7-a635-48d4-a641-2c74d0878bbe',
          name: 'Luna',
          species: 'gato',
          breed: 'Siamés',
          age: 'joven',
          size: 'pequeño',
          sex: 'hembra',
          energy: 'moderada',
          kg: 3.5,
          isVaccinated: true,
          isSterilized: true,
          isDewormed: true,
          hasMicrochip: true,
          story: 'Fue encontrada abandonada en un parque.',
          traits: ['independiente', 'tranquila'],
          status: 'disponible',
          isActive: true,
          photoUrls: ['https://example.com/image2.jpg'],
          createdAt: '2023-06-20T14:15:00Z',
          updatedAt: '2023-06-20T14:15:00Z'
        }
      ],
      total: 2
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    }
  })
  @ApiForbiddenResponse({
    description: 'Usuario sin permisos para acceder al recurso',
    example: {
      message: 'Usuario sin permisos suficientes',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Error interno del servidor',
    example: {
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  })
  @Auth(UserRole.ADMIN)
  findAll(
    @Query() queryParams
  ) {
    const { page, limit, ...filterParams } = queryParams;
    return this.petService.findAll({ page, limit }, filterParams);
  }

  @Get('users/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener mascotas compatibles para un usuario', description: 'Retorna una lista de mascotas que son compatibles con el usuario especificado' })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: String })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de elementos por página', type: Number })
  @ApiQuery({ name: 'search', required: false, description: 'Término de búsqueda', type: String })
  @ApiQuery({ name: 'species', required: false, description: 'Filtrar por especie', enum: PetSpecies })
  @ApiQuery({ name: 'size', required: false, description: 'Filtrar por tamaño', enum: PetSize })
  @ApiQuery({ name: 'age', required: false, description: 'Filtrar por edad', enum: PetAge })
  @ApiQuery({ name: 'sex', required: false, description: 'Filtrar por sexo', enum: PetSex })
  @ApiQuery({ name: 'energy', required: false, description: 'Filtrar por nivel de energía', enum: PetEnergy })
  @ApiQuery({ name: 'breed', required: false, description: 'Filtrar por raza', type: String })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por el estado en el que se encuentra la mascota', enum: PetStatus })
  @ApiOkResponse({ 
    description: 'Lista de mascotas compatibles obtenida exitosamente',
    example: {
      items: [
        {
          id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
          name: 'Firulais',
          species: 'perro',
          breed: 'Mestizo',
          age: 'adulto',
          size: 'mediano',
          sex: 'macho',
          energy: 'alta',
          kg: 15.5,
          isVaccinated: true,
          isSterilized: true,
          isDewormed: true,
          hasMicrochip: false,
          story: 'Fue rescatado de la calle hace 2 meses.',
          traits: ['cariñoso', 'juguetón'],
          status: 'disponible',
          isActive: true,
          photoUrls: ['https://example.com/image1.jpg'],
          createdAt: '2023-05-15T10:30:00Z',
          updatedAt: '2023-05-15T10:30:00Z'
        }
      ],
      total: 1,
      compatibilityScore: {
        "639dcdc7-a635-48d4-a641-2c74d0878bbd": 85
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'ID de usuario inválido',
    example: {
      message: 'El ID de usuario debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    }
  })
  @ApiForbiddenResponse({
    description: 'Usuario sin permisos para acceder al recurso',
    example: {
      message: 'Usuario sin permisos suficientes',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiNotFoundResponse({ 
    description: 'Usuario no encontrado',
    example: {
      message: 'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado o no es un adoptante',
      error: 'Not Found',
      statusCode: 404,
    }
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Error interno del servidor',
    example: {
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  })
  @Auth(UserRole.ADOPTERS)
  findCompatible(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() queryParams
  ) {
    const { page, limit, ...filterParams } = queryParams;
    return this.petService.findCompatiblePets(userId, { page, limit }, filterParams);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una mascota por ID', description: 'Retorna los detalles de una mascota específica' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiOkResponse({ 
    description: 'Mascota encontrada exitosamente', 
    example: {
      id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
      name: 'Firulais',
      species: 'perro',
      breed: 'Mestizo',
      age: 'adulto',
      size: 'mediano',
      sex: 'macho',
      energy: 'alta',
      description: 'Firulais es un perro muy cariñoso y juguetón',
      status: 'disponible',
      isActive: true,
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ],
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z'
    }
  })
  @ApiBadRequestResponse({ 
    description: 'ID de mascota inválido',
    example: {
      message: 'El ID de mascota debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    }
  })
  @ApiUnauthorizedResponse({
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiForbiddenResponse({
    description: 'Usuario sin permisos para acceder al recurso',
    example: {
      message: 'Usuario sin permisos suficientes',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado una mascota con el ID indicado',
    example: {
      message: 'Mascota con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una mascota', description: 'Actualiza los datos de una mascota existente' })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiBody({ type: UpdatePetDto, description: 'Datos de la mascota a actualizar' })
  @ApiOkResponse({ 
    description: 'Mascota actualizada exitosamente', 
    type: Pet,
    example: {
      id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
      name: 'Firulais',
      species: 'perro',
      breed: 'Mestizo',
      age: 'adulto',
      size: 'mediano',
      sex: 'macho',
      energy: 'alta',
      kg: 15.5,
      isVaccinated: true,
      isSterilized: true,
      isDewormed: true,
      hasMicrochip: false,
      story: 'Fue rescatado de la calle hace 2 meses y ahora está en tratamiento.',
      traits: ['cariñoso', 'juguetón', 'sociable'],
      status: 'en_tratamiento',
      isActive: true,
      photoUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ],
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-07-20T15:45:00Z'
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Datos de entrada o ID inválidos',
    example: {
      message: [
        'El nivel de energía debe ser un valor válido',
        'El estado de la mascota debe ser un valor válido'
      ],
      error: 'Bad Request',
      statusCode: 400,
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    }
  })
  @ApiForbiddenResponse({
    description: 'Usuario sin permisos para acceder al recurso',
    example: {
      message: 'Usuario sin permisos suficientes',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiNotFoundResponse({ 
    description: 'Mascota no encontrada',
    example: {
      message: 'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada o no está activa',
      error: 'Not Found',
      statusCode: 404,
    }
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Error interno del servidor',
    example: {
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  })
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
  @ApiOkResponse({ 
    description: 'Mascota eliminada exitosamente',
    example: {
      message: 'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878bbd eliminada exitosamente'
    }
  })
  @ApiBadRequestResponse({ 
    description: 'ID de mascota inválido',
    example: {
      message: 'El ID de mascota debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'No autorizado',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    }
  })
  @ApiForbiddenResponse({
    description: 'Usuario sin permisos para acceder al recurso',
    example: {
      message: 'Usuario sin permisos suficientes',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiNotFoundResponse({ 
    description: 'Mascota no encontrada',
    example: {
      message: 'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    }
  })
  @ApiInternalServerErrorResponse({ 
    description: 'Error interno del servidor',
    example: {
      message: 'Error interno del servidor',
      error: 'Internal Server Error',
      statusCode: 500,
    }
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.remove(id);
  }
}