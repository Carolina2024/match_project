/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({
    description: 'URLs de las fotos de la mascota',
    isArray: true,
    example: ['https://example.com/pet1.jpg', 'https://example.com/pet2.jpg'],
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [value];
      }
    }
    return value;
  })
  @IsArray({ message: 'Las URLs de fotos deben ser un arreglo' })
  @IsUrl(
    {},
    { each: true, message: 'Cada URL de foto debe tener un formato válido' },
  )
  photoUrls?: string[];
}
