import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { QueryUsersDto } from './dtos/query-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/userRole.enum';
import { OwnerOrAdminGuard } from '../auth/guards/owner-or-admin.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Pet } from '../pets/entities/pet.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description:
      'Retorna un listado de todos los usuarios registrados en la plataforma',
  })
  @ApiOkResponse({
    description: 'Retorno del listado de usuarios',
    example: {
      data: [
        {
          id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
          fullname: 'José Gómez',
          email: 'jose@example.com',
          role: 'adoptante',
          adopter: {
            id: '4aa3fc42-7b20-4058-a5d6-602e73b99a10',
            identityDocument: '28631246-9',
            birthDate: '2006-11-18',
            address: 'Calle 15, Urb Caja Grande, Región Metropolitana',
            homeType: 'Departamento pequeño',
            allowsPets: true,
            hadPets: false,
            hadPetsVaccinated: false,
            hadPetsCastrated: false,
            hoursAlone: 7,
            petDestroy:
              'Me pondría muy triste y trataría de prestarle más atención para ver por qué hace esas cosas',
            preparedToVisitVeterinarian: false,
            allowsVisit: true,
            isResponsibleAdoption: true,
            userPreferenceEnergy: 'Moderado',
            userPreferenceTraits: ['Cariñoso', 'Juguetón'],
            userPreferenceDogs: false,
            userPreferenceCats: true,
            userPreferenceChildren: false,
          },
        },
        {
          id: '2d00a0bd-03dc-4e2a-8a39-12e54b5cacc5',
          fullname: 'John Doe',
          email: 'john@example.com',
          role: 'adoptante',
          adopter: {
            id: 'da6c521a-fdb1-429d-8c68-deb8805172e2',
            identityDocument: '12345678-9',
            birthDate: '2000-05-09',
            address: 'Calle 13, Departamento 2, Región Metropolitana',
            homeType: 'Departamento grande',
            allowsPets: true,
            hadPets: false,
            hadPetsVaccinated: false,
            hadPetsCastrated: false,
            hoursAlone: 2,
            petDestroy: 'Lo educaré para que no lo vuelva a hacer',
            preparedToVisitVeterinarian: false,
            allowsVisit: true,
            isResponsibleAdoption: true,
            userPreferenceEnergy: 'Tranquilo',
            userPreferenceTraits: ['Cariñoso', 'Juguetón'],
            userPreferenceDogs: false,
            userPreferenceCats: true,
            userPreferenceChildren: false,
          },
        },
      ],
      total: 2,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  })
  @Auth(UserRole.ADMIN)
  @Get()
  getAllUsers(@Query() query: QueryUsersDto) {
    return this.usersService.findAll(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener un usuario por su ID',
    description: 'Retorna los datos del usuario con el ID indicado',
  })
  @ApiOkResponse({
    description: 'Se devuelve el usuario con el ID indicado',
    example: {
      id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
      fullname: 'José Gómez',
      email: 'jose@example.com',
      role: 'adoptante',
      adopter: {
        id: '4aa3fc42-7b20-4058-a5d6-602e73b99a10',
        identityDocument: '28631246-9',
        birthDate: '2006-11-18',
        address: 'Calle 15, Urb Caja Grande, Región Metropolitana',
        homeType: 'Departamento pequeño',
        allowsPets: true,
        hadPets: false,
        hadPetsVaccinated: false,
        hadPetsCastrated: false,
        hoursAlone: 7,
        petDestroy:
          'Me pondría muy triste y trataría de prestarle más atención para ver por qué hace esas cosas',
        preparedToVisitVeterinarian: false,
        allowsVisit: true,
        isResponsibleAdoption: true,
        userPreferenceEnergy: 'Moderado',
        userPreferenceTraits: ['Cariñoso', 'Juguetón'],
        userPreferenceDogs: false,
        userPreferenceCats: true,
        userPreferenceChildren: false,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario no está autenticado',
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
    description: 'No se ha encontrado un usuario con el ID indicado',
    example: {
      message:
        'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @UseGuards(AuthGuard(), OwnerOrAdminGuard)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar un usuario por su ID',
    description: 'Permite actualizar uno o más campos de un usuario por su ID',
  })
  @ApiOkResponse({
    description: 'Se actualiza el usuario exitosamente',
    example: {
      id: '2d00a0bd-03dc-4e2a-8a39-12e54b5cacc5',
      fullname: 'John Miguel Doe',
      email: 'johnmigueldoe@example.com',
      role: 'adoptante',
      adopter: {
        id: 'da6c521a-fdb1-429d-8c68-deb8805172e2',
        identityDocument: '12345678-9',
        birthDate: '2000-05-09',
        address: 'Calle 13, Departamento 2, Región Metropolitana',
        homeType: 'Departamento grande',
        allowsPets: true,
        hadPets: false,
        hadPetsVaccinated: false,
        hadPetsCastrated: false,
        hoursAlone: 2,
        petDestroy: 'Lo educaré para que no lo vuelva a hacer',
        preparedToVisitVeterinarian: false,
        allowsVisit: true,
        isResponsibleAdoption: true,
        userPreferenceEnergy: 'Tranquilo',
        userPreferenceTraits: ['Cariñoso', 'Juguetón'],
        userPreferenceDogs: true,
        userPreferenceCats: true,
        userPreferenceChildren: false,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario no está autenticado',
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
    description: 'No se ha encontrado un usuario con el ID indicado',
    example: {
      message:
        'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @UseGuards(AuthGuard(), OwnerOrAdminGuard)
  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Elimina la cuenta del usuario por su ID',
    description:
      'Retorna un mensaje indicando que la cuenta del usuario se ha eliminado exitosamente',
  })
  @ApiOkResponse({
    description: 'Se elimina la cuenta del usuario con el ID',
    example: {
      message: 'La cuenta del usuario ha sido eliminada exitosamente',
    },
  })
  @ApiBadRequestResponse({
    description: 'El usuario ya se encuentra eliminado',
    example: {
      message: 'El usuario ya está eliminado',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'No se encuentra el usuario con el ID',
    example: {
      message:
        'Usuario con id 639dcdc7-a635-48d4-b641-2c74d0878bbd no encontrado',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Auth(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @ApiOperation({
    summary: 'Obtener mascotas de un usuario',
    description: 'Retorna todas las mascotas asociadas al usuario especificado',
  })
  @ApiOkResponse({
    description: 'Lista de mascotas del usuario obtenida exitosamente',
    type: [Pet],
    example: [
      {
        id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
        name: 'Duke',
        species: 'Perro',
        breed: 'Labrador',
        age: 'Adulto',
        photoUrls: ['https://example.com/dog13.jpg'],
        status: 'Adoptado'
      }
    ],
  })
  @Auth(UserRole.ADOPTERS)
  @UseGuards(AuthGuard(), OwnerOrAdminGuard)
  @Get(':id/pets')
  getUserPets(@Param('id', ParseUUIDPipe) userId: string) {
    return this.usersService.findUserPets(userId);
  }
}
