import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

export function GetAllUsersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los usuarios',
      description:
        'Retorna un listado de todos los usuarios registrados en la plataforma (solo para administradores)',
    }),
    ApiOkResponse({
      description: 'Retorno del listado de usuarios',
      example: {
        data: [
          {
            id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
            fullname: 'José Gómez',
            email: 'jose@example.com',
            role: 'adoptante',
            createdAt: '2025-05-16T03:47:02.989Z',
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
            createdAt: '2025-05-16T03:47:02.989Z',
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
    }),
  );
}

export function GetUserByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un usuario por su ID',
      description:
        'Retorna los datos del usuario con el ID indicado (solo para administradores o adoptantes con su propio ID)',
    }),
    ApiOkResponse({
      description: 'Se devuelve el usuario con el ID indicado',
      example: {
        id: '639dcdc7-abcd-1234-a641-2c74d087fghj',
        fullname: 'José Gómez',
        email: 'jose@example.com',
        role: 'adoptante',
        createdAt: '2025-05-16T03:47:02.989Z',
        adopter: {
          id: '4aa3fc42-4321-4dac-a5d6-602e73b99abc',
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
    }),
    ApiNotFoundResponse({
      description: 'No se ha encontrado un usuario con el ID indicado',
      example: {
        message:
          'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}

export function UpdateUserByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un usuario por su ID',
      description:
        'Permite actualizar uno o más campos de un usuario por su ID (solo para administradores o adoptantes con su propio ID)',
    }),
    ApiOkResponse({
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
    }),
    ApiBadRequestResponse({
      description: 'El usuario ingresa un dato con un formato inválido',
      example: {
        message: [
          'Ingrese un Documento de Identidad válido en Chile siguiendo el siguiente formato: 12345678-9',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiNotFoundResponse({
      description: 'No se ha encontrado un usuario con el ID indicado',
      example: {
        message:
          'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
    ApiConflictResponse({
      description:
        'El correo electrónico o el documento de identidad ingresados por el usuario ya se encuentran registrados por otro usuario',
      example: {
        message: 'Ya existe un usuario con ese correo',
        error: 'Conflict',
        statusCode: 409,
      },
    }),
  );
}

export function DeleteUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Elimina la cuenta del usuario por su ID',
      description:
        'Retorna un mensaje indicando que la cuenta del usuario se ha eliminado exitosamente (solo para administradores)',
    }),
    ApiOkResponse({
      description: 'Se elimina la cuenta del usuario con el ID',
      example: {
        message: 'La cuenta del usuario ha sido eliminada exitosamente',
      },
    }),
    ApiNotFoundResponse({
      description: 'No se encuentra el usuario con el ID',
      example: {
        message:
          'Usuario con id 639dcdc7-a635-48d4-b641-2c74d0878bbd no encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}
