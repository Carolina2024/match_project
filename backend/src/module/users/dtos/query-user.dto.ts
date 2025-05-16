import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class QueryUsersDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Buscar por nombre',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString({ message: 'El nombre completo debe ser una cadena de caracteres' })
  fullname?: string;

  @ApiPropertyOptional({
    description: 'Buscar por email',
    example: 'john@example.com',
  })
  @IsOptional()
  @IsString({ message: 'El correo debe ser una cadena de caracteres' })
  email?: string;
}
