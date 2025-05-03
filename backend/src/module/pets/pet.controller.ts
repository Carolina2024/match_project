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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Pet } from './entities/pet.entity';
import { UserRole } from 'src/common/enums/userRole.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import {
  PetAge,
  PetEnergy,
  PetSex,
  PetSize,
  PetSpecies,
  PetStatus,
} from 'src/common/enums/pet.enum';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Mascotas')
@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  @ApiConsumes('multipart/form-data')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({
  //   summary: 'Crear una nueva mascota',
  //   description: 'Crea un nuevo registro de mascota en el sistema',
  // })
  // @ApiBody({ type: CreatePetDto, description: 'Datos de la mascota a crear' })
  // @ApiCreatedResponse({
  //   description: 'La mascota ha sido creada exitosamente',
  //   type: Pet,
  //   example: {
  //     id: '639dcdc7-a635-48d4-a641-2c74d0878bbd',
  //     name: 'Firulais',
  //     species: 'perro',
  //     breed: 'Mestizo',
  //     age: 'adulto',
  //     size: 'mediano',
  //     sex: 'macho',
  //     energy: 'alta',
  //     kg: 15.5,
  //     isVaccinated: true,
  //     isSterilized: true,
  //     isDewormed: true,
  //     hasMicrochip: false,
  //     story: 'Fue rescatado de la calle hace 2 meses.',
  //     traits: ['cariñoso', 'juguetón'],
  //     status: 'disponible',
  //     isActive: true,
  //     photoUrls: [
  //       'https://example.com/image1.jpg',
  //       'https://example.com/image2.jpg',
  //     ],
  //     createdAt: '2023-05-15T10:30:00Z',
  //     updatedAt: '2023-05-15T10:30:00Z',
  //   },
  // })
  // @ApiBadRequestResponse({
  //   description: 'Datos de entrada inválidos',
  //   example: {
  //     message: [
  //       'El nombre debe ser una cadena de texto',
  //       'El tamaño debe ser un valor válido',
  //       'La fecha de nacimiento debe ser una fecha válida',
  //     ],
  //     error: 'Bad Request',
  //     statusCode: 400,
  //   },
  // })
  //@Auth(UserRole.ADMIN)
  
  create(@Body() createPetDto: CreatePetDto, @UploadedFiles() files: Express.Multer.File[]) {
    try{
      return this.petService.create(createPetDto, files);

    } catch (error) {
      throw new BadRequestException('Error al crear la mascota '+error)
    }
  }

  @ApiOperation({
    summary: 'Obtener lista de mascotas con información limitada',
    description:
      'Retorna una lista paginada de mascotas con información básica',
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
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Término de búsqueda',
    type: String,
  })
  @ApiQuery({
    name: 'species',
    required: false,
    description: 'Filtrar por especie',
    enum: PetSpecies,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Filtrar por tamaño',
    enum: PetSize,
  })
  @ApiQuery({
    name: 'age',
    required: false,
    description: 'Filtrar por edad',
    enum: PetAge,
  })
  @ApiQuery({
    name: 'sex',
    required: false,
    description: 'Filtrar por sexo',
    enum: PetSex,
  })
  @ApiQuery({
    name: 'energy',
    required: false,
    description: 'Filtrar por nivel de energía',
    enum: PetEnergy,
  })
  @ApiQuery({
    name: 'breed',
    required: false,
    description: 'Filtrar por raza',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por el estado en el que se encuentra la mascota',
    enum: PetStatus,
  })
  @ApiOkResponse({
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
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllLimited(@Query() queryParams) {
    const { page, limit, ...filterParams } = queryParams;
    return this.petService.findAllLimited({ page, limit }, filterParams);
  }

  @Get('complete')
  @ApiOperation({
    summary: 'Obtener lista completa de mascotas',
    description:
      'Retorna una lista paginada de mascotas con toda su información',
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
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Término de búsqueda',
    type: String,
  })
  @ApiQuery({
    name: 'species',
    required: false,
    description: 'Filtrar por especie',
    enum: PetSpecies,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Filtrar por tamaño',
    enum: PetSize,
  })
  @ApiQuery({
    name: 'age',
    required: false,
    description: 'Filtrar por edad',
    enum: PetAge,
  })
  @ApiQuery({
    name: 'sex',
    required: false,
    description: 'Filtrar por sexo',
    enum: PetSex,
  })
  @ApiQuery({
    name: 'energy',
    required: false,
    description: 'Filtrar por nivel de energía',
    enum: PetEnergy,
  })
  @ApiQuery({
    name: 'breed',
    required: false,
    description: 'Filtrar por raza',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por el estado en el que se encuentra la mascota',
    enum: PetStatus,
  })
  @ApiOkResponse({
    description: 'Lista completa de mascotas obtenida exitosamente',
    example: {
      items: [
        {
          id: '497fe8df-f6d9-438d-9c33-437d7a46d318',
          name: 'Duke',
          size: 'Grande',
          birthDate: '2016-07-03',
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
          story: 'Dulce y tranquilo, perfecto compañero para personas mayores.',
          traits: ['Juguetón', 'Cariñoso'],
          admissionDate: '2022-12-19',
          photoUrls: ['https://example.com/dog13.jpg'],
          status: 'Disponible',
        },
        {
          id: 'e1a1ba4b-0bd2-47c2-8be3-86f2b55ea161',
          name: 'Shadow',
          size: 'Mediano',
          birthDate: '2018-10-11',
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
          birthDate: '2022-02-13',
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
          birthDate: '2019-08-29',
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
  })
  @Auth(UserRole.ADMIN)
  findAll(@Query() queryParams) {
    const { page, limit, ...filterParams } = queryParams;
    return this.petService.findAll({ page, limit }, filterParams);
  }

  @Get('users/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener mascotas compatibles para un usuario',
    description:
      'Retorna una lista de mascotas que son compatibles con el usuario especificado',
  })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: String })
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
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Término de búsqueda',
    type: String,
  })
  @ApiQuery({
    name: 'species',
    required: false,
    description: 'Filtrar por especie',
    enum: PetSpecies,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Filtrar por tamaño',
    enum: PetSize,
  })
  @ApiQuery({
    name: 'age',
    required: false,
    description: 'Filtrar por edad',
    enum: PetAge,
  })
  @ApiQuery({
    name: 'sex',
    required: false,
    description: 'Filtrar por sexo',
    enum: PetSex,
  })
  @ApiQuery({
    name: 'energy',
    required: false,
    description: 'Filtrar por nivel de energía',
    enum: PetEnergy,
  })
  @ApiQuery({
    name: 'breed',
    required: false,
    description: 'Filtrar por raza',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por el estado en el que se encuentra la mascota',
    enum: PetStatus,
  })
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
          updatedAt: '2023-05-15T10:30:00Z',
        },
      ],
      total: 1,
      compatibilityScore: {
        '639dcdc7-a635-48d4-a641-2c74d0878bbd': 85,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID de usuario inválido',
    example: {
      message: 'El ID de usuario debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuario no encontrado',
    example: {
      message:
        'Usuario con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrado o no es un adoptante',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Auth(UserRole.ADOPTERS)
  findCompatible(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() queryParams,
  ) {
    const { page, limit, ...filterParams } = queryParams;
    return this.petService.findCompatiblePets(
      userId,
      { page, limit },
      filterParams,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener una mascota por ID',
    description: 'Retorna los detalles de una mascota específica',
  })
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
        'https://example.com/image2.jpg',
      ],
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'ID de mascota inválido',
    example: {
      message: 'El ID de mascota debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'No se ha encontrado una mascota con el ID indicado',
    example: {
      message:
        'Mascota con id 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar una mascota',
    description: 'Actualiza los datos de una mascota existente',
  })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiBody({
    type: UpdatePetDto,
    description: 'Datos de la mascota a actualizar',
  })
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
      story:
        'Fue rescatado de la calle hace 2 meses y ahora está en tratamiento.',
      traits: ['cariñoso', 'juguetón', 'sociable'],
      status: 'en_tratamiento',
      isActive: true,
      photoUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ],
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-07-20T15:45:00Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada o ID inválidos',
    example: {
      message: [
        'El nivel de energía debe ser un valor válido',
        'El estado de la mascota debe ser un valor válido',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'Mascota no encontrada',
    example: {
      message:
        'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada o no está activa',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Auth(UserRole.ADMIN)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    return this.petService.update(id, updatePetDto);
  }

  @ApiOperation({
    summary: 'Eliminar una mascota',
    description:
      'Realiza la eliminación de la información de mascota con el ID indicado',
  })
  @ApiParam({ name: 'id', description: 'ID de la mascota', type: String })
  @ApiOkResponse({
    description: 'Mascota eliminada exitosamente',
    example: {
      message:
        'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878bbd eliminada exitosamente',
    },
  })
  @ApiBadRequestResponse({
    description: 'ID de mascota inválido',
    example: {
      message: 'El ID de mascota debe ser un UUID válido',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiNotFoundResponse({
    description: 'Mascota no encontrada',
    example: {
      message:
        'Mascota con ID 639dcdc7-a635-48d4-a641-2c74d0878cbd no encontrada',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Auth(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.petService.remove(id);
  } 
}
