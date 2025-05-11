import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchStatusDto } from './dto/update-match-status.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from '../../common/enums/userRole.enum';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { Match } from './entities/match.entity';
import { MatchStatus } from '../../common/enums/match-status.enum';

import { FilterMatchDto } from './dto/filterMatch.dto';

@ApiTags('Solicitudes de Adopción')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchsService: MatchesService) {}

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
  @Post()
  @Auth(UserRole.ADOPTERS)
  create(
    @GetUser('id') userId: string,
    @Body() createMatchDto: CreateMatchDto,
  ) {
    return this.matchsService.create(userId, createMatchDto);
  }

  @ApiOperation({
    summary: 'Obtener todas las solicitudes de adopción',
    description:
      'Retorna todas las solicitudes de adopción (solo para administradores)',
  })
  @ApiOkResponse({
    description: 'Lista de solicitudes obtenida exitosamente',
    type: [Match],
    example: {
      items: [
        {
          id: '1e04ef5f-cd9d-402b-a317-e1de0717e5b5',
          user: {
            fullname: 'Adrián Lugo',
            email: 'adrian@example.com',
            adopter: {
              identityDocument: '12341178-9',
              address:
                'Calle 12, Departamento 4, Comuna San Miguel, Región Metropolitana',
            },
          },
          userId: 'dc5038c3-aa07-4ac9-b2ff-50c2e5b596a5',
          pet: {
            id: '22f0f615-8552-4113-a8f0-bd0375083390',
            name: 'Chloe',
          },
          petId: '22f0f615-8552-4113-a8f0-bd0375083390',
          applicationDate: '2025-05-11T03:46:54.117Z',
          status: 'Aprobado',
        },
        {
          id: '480d0bff-0f14-467b-8251-c20da8653a8a',
          user: {
            fullname: 'Nayeli',
            email: 'nayeli@example.com',
            adopter: {
              identityDocument: '87654321-1',
              address:
                'Calle 12, Departamento 4, Comuna San Miguel, Región Metropolitana',
            },
          },
          userId: '4a8d27b4-90b0-4fb8-bb93-4617241ca19b',
          pet: {
            id: 'd2dd1505-d4d6-45e0-967d-2282da6f1102',
            name: 'Benito',
          },
          petId: 'd2dd1505-d4d6-45e0-967d-2282da6f1102',
          applicationDate: '2025-05-11T03:46:54.117Z',
          status: 'Por revisar',
        },
        {
          id: 'ddc02439-2631-4491-ad3a-99b8bb7b8052',
          user: {
            fullname: 'Camilo Doe',
            email: 'camilo@example.com',
            adopter: {
              identityDocument: '12555678-9',
              address:
                'Calle 12, Departamento 4, Comuna San Miguel, Región Metropolitana',
            },
          },
          userId: 'ec1f9c31-8cc0-4555-80b2-19784a276393',
          pet: {
            id: 'd566f2f2-7e52-49ef-a8a3-55f29fb69633',
            name: 'Verita',
          },
          petId: 'd566f2f2-7e52-49ef-a8a3-55f29fb69633',
          applicationDate: '2025-05-11T03:46:54.117Z',
          status: 'En proceso',
        },
      ],
      total: 3,
      page: 1,
      limit: 8,
      totalPages: 1,
    },
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description:
      'Busca por nombre de los adoptantes o por el nombre de la mascota',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description:
      'Filtra las solicitudes de adopción por el "status" en que se encuentra la solicitud',
    enum: MatchStatus,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de elementos por página',
    type: Number,
  })
  @Get()
  @Auth(UserRole.ADMIN)
  findAll(@Query() filterMatchDto: FilterMatchDto) {
    return this.matchsService.findAll(filterMatchDto);
  }

  @ApiOperation({
    summary: 'Obtener solicitudes del usuario actual',
    description:
      'Retorna todas las solicitudes de adopción del usuario autenticado',
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
  @Get('user')
  @Auth(UserRole.ADOPTERS)
  findByUser(@GetUser('id') userId: string) {
    return this.matchsService.findByUser(userId);
  }

  @ApiOperation({
    summary: 'Obtener una solicitud por ID',
    description: 'Retorna una solicitud de adopción específica por su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de la solicitud', type: String })
  @ApiOkResponse({
    description: 'Solicitud encontrada exitosamente',
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
      message:
        'Solicitud con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.ADOPTERS)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar el estado de una solicitud',
    description:
      'Actualiza el estado de una solicitud de adopción (solo para administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Transición de estado no válida',
    example: {
      message:
        'No se puede cambiar el estado de Por revisar a Aprobado. Solo se permite cambiar a En proceso',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado una solicitud con el ID indicado',
    example: {
      message:
        'Solicitud con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Patch(':id/status')
  @Auth(UserRole.ADMIN)
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMatchStatusDto: UpdateMatchStatusDto,
  ) {
    return this.matchsService.updateStatus(id, updateMatchStatusDto);
  }
}
