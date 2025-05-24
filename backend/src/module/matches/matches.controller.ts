import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchStatusDto } from './dto/update-match-status.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { UserRole } from '../../common/enums/userRole.enum';
import { ApiTags } from '@nestjs/swagger';

import { FilterMatchDto } from './dto/filterMatch.dto';
import {
  CreateMatchDocs,
  GetAllMatchesDocs,
  GetMatchByIdDocs,
  GetMatchesByUserDocs,
  UpdateMatchStatusDocs,
} from './matches.controller.docs';

@ApiTags('Solicitudes de Adopción')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchsService: MatchesService) {}

  @Post()
  @Auth(UserRole.ADOPTERS)
  @CreateMatchDocs()
  create(
    @GetUser('id') userId: string,
    @Body() createMatchDto: CreateMatchDto,
  ) {
    return this.matchsService.create(userId, createMatchDto);
  }

  @Get()
  @Auth(UserRole.ADMIN)
  @GetAllMatchesDocs()
  findAll(@Query() filterMatchDto: FilterMatchDto) {
    return this.matchsService.findAll(filterMatchDto);
  }

  @Get('user')
  @Auth(UserRole.ADOPTERS)
  @GetMatchesByUserDocs()
  findByUser(@GetUser('id') userId: string) {
    return this.matchsService.findByUser(userId);
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.ADOPTERS)
  @GetMatchByIdDocs()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchsService.findOne(id);
  }

  @Patch(':id/status')
  @Auth(UserRole.ADMIN)
  @UpdateMatchStatusDocs()
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMatchStatusDto: UpdateMatchStatusDto,
  ) {
    return this.matchsService.updateStatus(id, updateMatchStatusDto);
  }
}
