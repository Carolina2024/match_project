import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  PetSize,
  PetSex,
  PetAge,
  PetSpecies,
  PetEnergy,
  PetTrait,
  PetStatus,
} from 'src/common/enums/pet.enum';
import { Pet } from './entities/pet.entity';

export function CreatePetDocs() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiOperation({
      summary: 'Crear una nueva mascota',
      description:
        'Registra una nueva mascota en el sistema (solo para administradores)',
    }),
    ApiBody({
      description: 'Datos de la mascota a crear',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Firulais',
            description: 'Nombre de la mascota',
          },
          size: {
            type: 'string',
            enum: Object.values(PetSize),
            example: PetSize.MEDIUM,
            description: 'Tamaño de la mascota',
          },
          sex: {
            type: 'string',
            enum: Object.values(PetSex),
            example: PetSex.MALE,
            description: 'Sexo de la mascota',
          },
          age: {
            type: 'string',
            enum: Object.values(PetAge),
            example: PetAge.YOUNG,
            description: 'Edad de la mascota',
          },
          species: {
            type: 'string',
            enum: Object.values(PetSpecies),
            example: PetSpecies.DOG,
            description: 'Especie de la mascota',
          },
          energy: {
            type: 'string',
            enum: Object.values(PetEnergy),
            example: PetEnergy.MODERATE,
            description: 'Nivel de energía de la mascota',
          },
          breed: {
            type: 'string',
            example: 'Labrador',
            description: 'Raza de la mascota',
          },
          kg: {
            type: 'number',
            example: 15.5,
            description: 'Peso en Kilogramos de la mascota',
          },
          isVaccinated: {
            type: 'boolean',
            example: true,
            description: '¿La mascota está vacunada?',
          },
          isSterilized: {
            type: 'boolean',
            example: true,
            description: '¿La mascota está estirilizada?',
          },
          isDewormed: {
            type: 'boolean',
            example: true,
            description: '¿La mascota está desparasitada?',
          },
          hasMicrochip: {
            type: 'boolean',
            example: false,
            description: '¿La mascota tiene un microchip?',
          },
          story: {
            type: 'string',
            example: 'Fue rescatado de la calle hace 2 meses.',
            description: 'Historia de la mascota',
          },
          traits: {
            type: 'array',
            items: { type: 'string', enum: Object.values(PetTrait) },
            example: [PetTrait.AFFECTIONATE, PetTrait.CHILD_FRIENDLY],
            description: 'Rasgos de la personalidad de la mascota',
          },
          admissionDate: {
            type: 'string',
            format: 'date',
            example: '2023-01-15',
            description: 'Fecha de rescate de la mascota',
          },
          status: {
            type: 'string',
            enum: Object.values(PetStatus),
            example: PetStatus.AVAILABLE,
            description: 'Estado de disponibilidad de la mascota',
          },

          photos: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
            description: 'Imágenes de la mascota',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'La mascota ha sido creada exitosamente',
      type: Pet,
      example: {
        id: '083c7750-63e8-4a2c-a1f1-bd8c8fbc9cea',
        name: 'Firulais',
        size: 'Mediano',
        sex: 'Macho',
        age: 'Joven',
        species: 'Perro',
        energy: 'Moderado',
        breed: 'Labrador',
        kg: 15.5,
        isVaccinated: true,
        isSterilized: true,
        isDewormed: true,
        hasMicrochip: true,
        story: 'Fue rescatado de la calle hace 2 meses.',
        traits: ['Cariñoso', 'Amigable con niños'],
        admissionDate: '2023-01-15T00:00:00.000Z',
        photoUrls: [
          'https://res.cloudinary.com/asdfabh/image/upload/v1746324642/pets/exwybso4iyqxkv5xsezh.jpg',
        ],
        status: 'Disponible',
      },
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
      example: {
        message: [
          'El nombre debe ser una cadena de texto',
          'El tamaño debe ser un valor válido',
          'La fecha de nacimiento debe ser una fecha válida',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
  );
}

export function GetAllPetsLimitedDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener lista de mascotas con información limitada',
      description:
        'Retorna una lista paginada de mascotas con información básica',
    }),
    ApiOkResponse({
      description: 'Lista de mascotas obtenida exitosamente',
      example: {
        items: [
          {
            id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
            name: 'Duke',
            photoUrls: ['https://example.com/dog13.jpg'],
          },
          {
            id: 'e1a1ba4b-0bd2-47c2-8be3-86f2b55ea161',
            name: 'Shadow',
            photoUrls: ['https://example.com/cat8.jpg'],
          },
          {
            id: 'd3872fad-5fc7-4c8c-b58b-26b462c4a64e',
            name: 'Toby',
            photoUrls: ['https://example.com/dog11.jpg'],
          },
          {
            id: 'c6307986-6099-418d-be38-c51030324588',
            name: 'Zeus',
            photoUrls: ['https://example.com/dog10.jpg'],
          },
          {
            id: '41460e38-f029-49ea-b7cc-c900dd64317b',
            name: 'Bruno',
            photoUrls: ['https://example.com/dog9.jpg'],
          },
          {
            id: 'c9033b03-61f8-4331-a3b6-e5785ee1e757',
            name: 'Max',
            photoUrls: ['https://example.com/dog8.jpg'],
          },
          {
            id: '596b9ca9-986f-4781-94c3-9ea18611332e',
            name: 'Oliver',
            photoUrls: ['https://example.com/cat4.jpg'],
          },
          {
            id: '0da4f991-7647-46a9-ab23-60c6279fc687',
            name: 'Rocky',
            photoUrls: ['https://example.com/dog6.jpg'],
          },
          {
            id: 'a7a952c8-78db-44d8-8a62-37580f35de29',
            name: 'Thor',
            photoUrls: ['https://example.com/dog5.jpg'],
          },
          {
            id: '44887a05-7c72-491c-a8f4-2e5d0812c040',
            name: 'Simba',
            photoUrls: ['https://example.com/cat2.jpg'],
          },
        ],
        total: 13,
        page: 1,
        limit: 10,
        totalPages: 2,
      },
    }),
  );
}

export function GetAllPetsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener lista completa de mascotas',
      description:
        'Retorna una lista paginada de mascotas con toda su información (solo para administradores)',
    }),
    ApiOkResponse({
      description: 'Lista completa de mascotas obtenida exitosamente',
      example: {
        items: [
          {
            id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
            name: 'Duke',
            size: 'Grande',
            sex: 'Macho',
            age: 'Adulto Mayor',
            species: 'Perro',
            energy: 'Tranquilo',
            breed: 'Labrador',
            kg: '35.00',
            isVaccinated: true,
            isSterilized: true,
            isDewormed: true,
            hasMicrochip: true,
            story:
              'Dulce y tranquilo, perfecto compañero para personas mayores.',
            traits: ['Juguetón', 'Cariñoso'],
            admissionDate: '2022-12-19',
            photoUrls: ['https://example.com/dog13.jpg'],
            status: 'Disponible',
          },
          {
            id: 'e1a1ba4b-0bd2-47c2-8be3-86f2b55ea161',
            name: 'Shadow',
            size: 'Mediano',
            sex: 'Macho',
            age: 'Adulto',
            species: 'Gato',
            energy: 'Tranquilo',
            breed: 'Negro Mestizo',
            kg: '4.80',
            isVaccinated: true,
            isSterilized: true,
            isDewormed: true,
            hasMicrochip: true,
            story: 'Misterioso y elegante, le encanta observar desde lo alto.',
            traits: ['Independiente', 'Protector'],
            admissionDate: '2023-01-24',
            photoUrls: ['https://example.com/cat8.jpg'],
            status: 'Disponible',
          },
          {
            id: '22f0f615-8552-4113-a8f0-bd0375083390',
            name: 'Chloe',
            size: 'Pequeño',
            sex: 'Hembra',
            age: 'Cachorro',
            species: 'Perro',
            energy: 'Muy Activo',
            breed: 'Dachshund',
            kg: '3.00',
            isVaccinated: true,
            isSterilized: false,
            isDewormed: true,
            hasMicrochip: false,
            story: 'Pequeña pero llena de energía, muy cariñosa.',
            traits: ['Cariñoso', 'Juguetón'],
            admissionDate: '2023-05-09',
            photoUrls: ['https://example.com/dog12.jpg'],
            status: 'Disponible',
          },
          {
            id: 'd3872fad-5fc7-4c8c-b58b-26b462c4a64e',
            name: 'Toby',
            size: 'Mediano',
            sex: 'Macho',
            age: 'Adulto',
            species: 'Perro',
            energy: 'Muy Activo',
            breed: 'Border Collie',
            kg: '18.00',
            isVaccinated: true,
            isSterilized: false,
            isDewormed: true,
            hasMicrochip: true,
            story: 'Inteligente y activo, necesita mucho ejercicio mental.',
            traits: ['Juguetón', 'Amigable con otras mascotas'],
            admissionDate: '2023-04-04',
            photoUrls: ['https://example.com/dog11.jpg'],
            status: 'Disponible',
          },
        ],
        total: 21,
        limit: 4,
        page: 1,
        totalPages: 6,
      },
    }),
  );
}

export function GetCompatiblePetsByUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener mascotas compatibles para un usuario',
      description:
        'Retorna una lista de mascotas que son compatibles con el usuario especificado (solo para adoptantes)',
    }),
    ApiParam({ name: 'userId', description: 'ID del usuario', type: String }),
    ApiOkResponse({
      description: 'Lista de mascotas compatibles obtenida exitosamente',
      example: {
        items: [
          {
            id: '52912aba-efgh-4122-bebe-a8c6cf3d17ac',
            name: 'Firulay',
            size: 'Mediano',
            sex: 'Macho',
            age: 'Joven',
            species: 'Perro',
            energy: 'Moderado',
            breed: 'Labrador',
            kg: '15.50',
            isVaccinated: true,
            isSterilized: true,
            isDewormed: true,
            hasMicrochip: true,
            story: 'Fue rescatado de la calle hace 2 meses.',
            traits: ['Cariñoso', 'Amigable con niños'],
            admissionDate: '2023-01-15',
            photoUrls: ['https://example.jpg'],
            status: 'Disponible',
            created_at: '2025-05-05T00:58:13.786Z',
            updated_at: '2025-05-05T00:58:13.786Z',
          },
          {
            id: 'a7a652c8-acdb-4444-8862-37580f35awab',
            name: 'Thor',
            size: 'Extra Grande',
            sex: 'Macho',
            age: 'Adulto Mayor',
            species: 'Perro',
            energy: 'Moderado',
            breed: 'Gran Danés',
            kg: '45.00',
            isVaccinated: true,
            isSterilized: true,
            isDewormed: true,
            hasMicrochip: true,
            story: 'Gigante gentil, perfecto para familias con espacio.',
            traits: ['Amigable con niños', 'Independiente'],
            admissionDate: '2022-10-14',
            photoUrls: ['https://example.jpg'],
            status: 'Disponible',
            created_at: '2025-05-05T00:58:13.786Z',
            updated_at: '2025-05-05T00:58:13.786Z',
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    }),
    ApiBadRequestResponse({
      description: 'ID de usuario inválido',
      example: {
        message: 'El ID de usuario debe ser un UUID válido',
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiNotFoundResponse({
      description: 'Usuario no encontrado',
      example: {
        message:
          'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado o no es un adoptante',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}

export function GetPetByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener una mascota por ID',
      description:
        'Retorna los detalles de una mascota específica (solo para usuarios autenticados)',
    }),
    ApiParam({ name: 'id', description: 'ID de la mascota', type: String }),
    ApiOkResponse({
      description: 'Mascota encontrada exitosamente',
      example: {
        id: '52912aba-efgh-4122-bebe-a8c6cf3d17ac',
        name: 'Firulay',
        size: 'Mediano',
        sex: 'Macho',
        age: 'Joven',
        species: 'Perro',
        energy: 'Moderado',
        breed: 'Labrador',
        kg: '15.50',
        isVaccinated: true,
        isSterilized: true,
        isDewormed: true,
        hasMicrochip: true,
        story: 'Fue rescatado de la calle hace 2 meses.',
        traits: ['Cariñoso', 'Amigable con niños'],
        admissionDate: '2023-01-15',
        photoUrls: ['https://example.jpg'],
        status: 'Disponible',
      },
    }),
    ApiBadRequestResponse({
      description: 'ID de mascota inválido',
      example: {
        message: 'El ID de mascota debe ser un UUID válido',
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiNotFoundResponse({
      description: 'No se ha encontrado una mascota con el ID indicado',
      example: {
        message:
          'Mascota con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}

export function UpdatePetDocs() {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiOperation({
      summary: 'Actualizar una mascota',
      description:
        'Actualiza los datos de una mascota existente (solo para administradores)',
    }),
    ApiParam({ name: 'id', description: 'ID de la mascota', type: String }),
    ApiBody({
      description: 'Datos a actualizar de la mascota',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nombre de la mascota',
          },
          size: {
            type: 'string',
            enum: Object.values(PetSize),
            description: 'Tamaño de la mascota',
          },
          sex: {
            type: 'string',
            enum: Object.values(PetSex),
            description: 'Sexo de la mascota',
          },
          age: {
            type: 'string',
            enum: Object.values(PetAge),
            description: 'Edad de la mascota',
          },
          species: {
            type: 'string',
            enum: Object.values(PetSpecies),
            description: 'Especie de la mascota',
          },
          energy: {
            type: 'string',
            enum: Object.values(PetEnergy),
            description: 'Nivel de energía de la mascota',
          },
          breed: {
            type: 'string',
            description: 'Raza de la mascota',
          },
          kg: {
            type: 'number',
            description: 'Peso en Kilogramos de la mascota',
          },
          isVaccinated: {
            type: 'boolean',
            description: '¿La mascota está vacunada?',
          },
          isSterilized: {
            type: 'boolean',
            description: '¿La mascota está estirilizada?',
          },
          isDewormed: {
            type: 'boolean',
            description: '¿La mascota está desparasitada?',
          },
          hasMicrochip: {
            type: 'boolean',
            description: '¿La mascota tiene un microchip?',
          },
          story: {
            type: 'string',
            description: 'Historia de la mascota',
          },
          traits: {
            type: 'array',
            items: { type: 'string', enum: Object.values(PetTrait) },
            description: 'Rasgos de la personalidad de la mascota',
          },
          admissionDate: {
            type: 'string',
            format: 'date',
            description: 'Fecha de rescate de la mascota',
          },
          status: {
            type: 'string',
            enum: Object.values(PetStatus),
            description: 'Estado de disponibilidad de la mascota',
          },

          photos: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
            description: 'Imágenes de la mascota',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Mascota actualizada exitosamente',
      type: Pet,
      example: {
        id: '52912aba-efgh-4122-bebe-a8c6cf3d17ac',
        name: 'Firulay',
        size: 'Mediano',
        sex: 'Macho',
        age: 'Joven',
        species: 'Perro',
        energy: 'Moderado',
        breed: 'Labrador',
        kg: '15.50',
        isVaccinated: true,
        isSterilized: true,
        isDewormed: true,
        hasMicrochip: true,
        story: 'Fue rescatado de la calle hace 2 meses.',
        traits: ['Cariñoso', 'Amigable con niños'],
        admissionDate: '2023-01-15',
        photoUrls: ['https://example.jpg'],
        status: 'Disponible',
      },
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada o ID inválidos',
      example: {
        message: [
          'El nivel de energía debe ser un valor válido',
          'El estado de la mascota debe ser un valor válido',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiNotFoundResponse({
      description: 'Mascota no encontrada',
      example: {
        message:
          'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada o no está activa',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}

export function DeletePetDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Eliminar una mascota',
      description:
        'Realiza la eliminación de la información de mascota con el ID indicado (solo para administradores)',
    }),
    ApiParam({ name: 'id', description: 'ID de la mascota', type: String }),
    ApiOkResponse({
      description: 'Mascota eliminada exitosamente',
      example: {
        message:
          'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878bbd eliminada exitosamente',
      },
    }),
    ApiBadRequestResponse({
      description: 'ID de mascota inválido',
      example: {
        message: 'El ID de mascota debe ser un UUID válido',
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiNotFoundResponse({
      description: 'Mascota no encontrada',
      example: {
        message:
          'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}
