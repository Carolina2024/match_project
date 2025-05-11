import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MatchStatus } from 'src/common/enums/match-status.enum';

export class FilterMatchDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;
}
