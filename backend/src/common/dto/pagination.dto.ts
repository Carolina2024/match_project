import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Cantidad de elementos por página',
    example: '10',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Número de página',
    example: '1',
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number;
}
