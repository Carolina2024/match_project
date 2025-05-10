import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({
    description: 'ID de la mascota para la solicitud de adopción',
    example: '083c7750-63e8-4a2c-a1f1-bd8c8fbc9cea',
  })
  @IsNotEmpty({ message: 'El ID de la mascota es requerido' })
  @IsUUID('4', { message: 'El ID de la mascota debe ser un UUID válido' })
  petId: string;
}