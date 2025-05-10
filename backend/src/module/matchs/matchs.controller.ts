import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchStatusDto } from './dto/update-match-status.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from '../../common/enums/userRole.enum';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiResponse, 
  ApiTags, 
  ApiCreatedResponse, 
  ApiOkResponse, 
  ApiBadRequestResponse, 
  ApiNotFoundResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { Match } from './entities/match.entity';
import { MatchStatus } from '../../common/enums/match-status.enum';

@ApiTags('Solicitudes de Adopción')
@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Post()
  @Auth(UserRole.ADOPTERS)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear una solicitud de adopción',
    description: 'Crea una nueva solicitud de adopción para una mascota',
  })
  @ApiBody({
    description: 'Datos de la solicitud de adopción a crear',
    type: CreateMatchDto,
  })
  @ApiCreatedResponse({
    description: 'La solicitud ha sido creada exitosamente',
    type: Match,
    example: {
      id: '083c7750-63e8-4a2c-a1f1-bd8c8fbc9cea',
      userId: '2d00a0bd-03dc-4e2a-8a39-12e54b5cacc5',
      petId: '497fe8df-f6d9-438d-9c33-437d7a46d318',
      status: MatchStatus.POR_REVISAR,
      createdAt: '2023-05-15T10:30:00.000Z',
      updatedAt: '2023-05-15T10:30:00.000Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos o solicitud duplicada',
    example: {
      message: 'Ya existe una solicitud para esta mascota',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  create(@GetUser('id') userId: string, @Body() createMatchDto: CreateMatchDto) {
    return this.matchsService.create(userId, createMatchDto);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener todas las solicitudes de adopción',
    description: 'Retorna todas las solicitudes de adopción (solo para administradores)',
  })
  @ApiOkResponse({
    description: 'Lista de solicitudes obtenida exitosamente',
    type: [Match],
    example: [
      {
        id: '083c7750-63e8-4a2c-a1f1-bd8c8fbc9cea',
        status: 'Por revisar',
        createdAt: '2023-05-15T10:30:00.000Z',
        updatedAt: '2023-05-15T10:30:00.000Z',
        user: {
          id: '2d00a0bd-03dc-4e2a-8a39-12e54b5cacc5',
          fullname: 'John Doe',
          email: 'john@example.com',
        },
        pet: {
          id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
          name: 'Duke',
          species: 'Perro',
          photoUrls: ['https://example.com/dog13.jpg'],
        },
      },
      {
        id: 'e1a1ba4b-0bd2-47c2-8be3-86f2b55ea161',
        status: 'En proceso',
        createdAt: '2023-05-16T14:20:00.000Z',
        updatedAt: '2023-05-17T09:15:00.000Z',
        user: {
          id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
          fullname: 'José Gómez',
          email: 'jose@example.com',
        },
        pet: {
          id: 'e1a1ba4b-0bd2-47c2-8be3-86f2b55ea161',
          name: 'Shadow',
          species: 'Gato',
          photoUrls: ['https://example.com/cat8.jpg'],
        },
      },
    ],
  })
  findAll() {
    return this.matchsService.findAll();
  }

  @Get('user')
  @Auth(UserRole.ADOPTERS)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener solicitudes del usuario actual',
    description: 'Retorna todas las solicitudes de adopción del usuario autenticado',
  })
  @ApiOkResponse({
    description: 'Lista de solicitudes del usuario obtenida exitosamente',
    type: [Match],
    example: [
      {
        id: '083c7750-63e8-4a2c-a1f1-bd8c8fbc9cea',
        status: 'Por revisar',
        createdAt: '2023-05-15T10:30:00.000Z',
        updatedAt: '2023-05-15T10:30:00.000Z',
        pet: {
          id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
          name: 'Duke',
          species: 'Perro',
          photoUrls: ['https://example.com/dog13.jpg'],
        },
      },
      {
        id: 'c6307986-6099-418d-be38-c51030324588',
        status: 'Aprobado',
        createdAt: '2023-04-10T08:45:00.000Z',
        updatedAt: '2023-04-15T16:30:00.000Z',
        pet: {
          id: 'c6307986-6099-418d-be38-c51030324588',
          name: 'Zeus',
          species: 'Perro',
          photoUrls: ['https://example.com/dog10.jpg'],
        },
      },
    ],
  })
  findByUser(@GetUser('id') userId: string) {
    return this.matchsService.findByUser(userId);
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.ADOPTERS)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener una solicitud por ID',
    description: 'Retorna una solicitud de adopción específica por su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de la solicitud', type: String })
  @ApiOkResponse({
    description: 'Solicitud encontrada exitosamente',
    type: Match,
    example: {
      id: '083c7750-63e8-4a2c-a1f1-bd8c8fbc9cea',
      status: 'Por revisar',
      createdAt: '2023-05-15T10:30:00.000Z',
      updatedAt: '2023-05-15T10:30:00.000Z',
      user: {
        id: '2d00a0bd-03dc-4e2a-8a39-12e54b5cacc5',
        fullname: 'John Doe',
        email: 'john@example.com',
      },
      pet: {
        id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
        name: 'Duke',
        species: 'Perro',
        breed: 'Labrador',
        age: 'Adulto Mayor',
        photoUrls: ['https://example.com/dog13.jpg'],
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID de solicitud inválido',
    example: {
      message: 'El ID de solicitud debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado una solicitud con el ID indicado',
    example: {
      message: 'Solicitud con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchsService.findOne(id);
  }

  @Patch(':id/status')
  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar el estado de una solicitud',
    description: 'Actualiza el estado de una solicitud de adopción (solo para administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Transición de estado no válida',
    example: {
      message: 'No se puede cambiar el estado de Por revisar a Aprobado. Solo se permite cambiar a En proceso',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado una solicitud con el ID indicado',
    example: {
      message: 'Solicitud con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMatchStatusDto: UpdateMatchStatusDto,
  ) {
    return this.matchsService.updateStatus(id, updateMatchStatusDto);
  }
}