import {
  IsOptional,
  IsString,
  IsBooleanString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums/userRole.enum';

export class QueryUsersDto {
  @ApiPropertyOptional({ description: 'Número de página' })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de usuarios por página',
  })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ description: 'Buscar por nombre' })
  @IsOptional()
  @IsString({ message: 'El nombre completo debe ser una cadena de caracteres' })
  fullname?: string;

  @ApiPropertyOptional({ description: 'Buscar por email' })
  @IsOptional()
  @IsString({ message: 'El correo debe ser una cadena de caracteres' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por usuarios activos',
  })
  @IsOptional()
  @IsBooleanString({
    message: 'isActive debe ser un booleano válido en formato string',
  })
  isActive?: string;
}
