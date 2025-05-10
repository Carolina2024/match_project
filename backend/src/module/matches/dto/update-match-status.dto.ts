import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from '../../../common/enums/match-status.enum';

export class UpdateMatchStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la solicitud de adopción',
    enum: MatchStatus,
    example: MatchStatus.EN_PROCESO,
  })
  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsEnum(MatchStatus, {
    message: `El estado debe ser un valor válido: ${Object.values(MatchStatus).join(', ')}`,
  })
  status: MatchStatus;
}
