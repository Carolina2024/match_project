
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from '@nestjs/common';


import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QueryUsersDto } from './dtos/query-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from 'src/common/enums/userRole.enum';
import { OwnerOrAdminGuard } from '../auth/guards/owner-or-admin.guard';

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
          isActive: true,
          adopter: {
            id: '4aa3fc42-7b20-4058-a5d6-602e73b99a10',
            run: '28631246-9',
            birthDate: '2006-11-18',
            address: 'Calle 15, Urb Caja Grande, Región Metropolitana',
            homeType: 'Departamento pequeño',
            allowsPets: true,
            hasDogs: false,
            hasCats: true,
            hasChildren: false,
            petsExperience: false,
            isVaccinated: false,
            isSterilized: false,
            hoursAlone: 7,
            petDestroy:
              'Me pondría muy triste y trataría de prestarle más atención para ver por qué hace esas cosas',
            hasVeterinarian: false,
            allowsVisit: true,
            isResponsibleAdoption: true,
          },
        },
        {
          id: '2d00a0bd-03dc-4e2a-8a39-12e54b5cacc5',
          fullname: 'John Doe',
          email: 'john@example.com',
          role: 'adoptante',
          isActive: true,
          adopter: {
            id: 'da6c521a-fdb1-429d-8c68-deb8805172e2',
            run: '12345678-9',
            birthDate: '1998-09-21',
            address:
              'Calle 12, Departamento 4, Comuna San Miguel, Región Metropolitana',
            homeType: 'Departamento grande',
            allowsPets: true,
            hasDogs: true,
            hasCats: true,
            hasChildren: true,
            petsExperience: true,
            isVaccinated: true,
            isSterilized: true,
            hoursAlone: 3,
            petDestroy: 'Lo educaré para que no vuelva a repetir esa acción',
            hasVeterinarian: true,
            allowsVisit: true,
            isResponsibleAdoption: true,
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
      isActive: true,
      adopter: {
        id: '4aa3fc42-7b20-4058-a5d6-602e73b99a10',
        run: '28631246-9',
        birthDate: '2006-11-18',
        address: 'Calle 15, Urb Caja Grande, Región Metropolitana',
        homeType: 'Departamento pequeño',
        allowsPets: true,
        hasDogs: false,
        hasCats: true,
        hasChildren: false,
        petsExperience: false,
        isVaccinated: false,
        isSterilized: false,
        hoursAlone: 7,
        petDestroy:
          'Me pondría muy triste y trataría de prestarle más atención para ver por qué hace esas cosas',
        hasVeterinarian: false,
        allowsVisit: true,
        isResponsibleAdoption: true,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'El usuario no se autenticó',
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
  
  @ApiOperation({
    summary: 'Activa la cuenta del usuario por su ID',
    description: 'Retorna un mensaje indicando que la cuenta del usuario se ha usuario activado correctamente'
  })
  @Patch(':id/restore')
  restore( @Param('id', ParseUUIDPipe) id:string) {
    return this.usersService.restore(id);
  }
  
  @ApiOperation({
    summary: 'Desactiva la cuenta del usuario por su ID',
    description: 'Retorna un mensaje indicando que la cuenta del usuario se ha desactivado exitosamente'
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string){ 
    return this.usersService.remove(id);
  }
}
