import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { ChronicService } from './ChronicService';

import { IChronic } from './interfaces/IChronic';
import { IChronicExtended } from './interfaces/IChronicExtended';
import { IChronicCreateData } from './interfaces/IChronicCreateData';
import { IChronicUpdateData } from './interfaces/IChronicUpdateData';

import { GetChronicByIdQueryDto } from './dto/GetChronicByIdQueryDto';
import { GetChronicByIdResponseDto } from './dto/GetChronicByIdResponseDto';
import { GetManyChronicsQueryDto } from './dto/GetManyChronicsQueryDto';
import { GetManyChronicsResponseDto } from './dto/GetManyChronicsResponseDto';
import { CreateChronicQueryDto } from './dto/CreateChronicQueryDto';
import { CreateChronicBodyDto } from './dto/CreateChronicBodyDto';
import { CreateChronicResponseDto } from './dto/CreateChronicResponseDto';
import { UpdateChronicQueryDto } from './dto/UpdateChronicQueryDto';
import { UpdateChronicBodyDto } from './dto/UpdateChronicBodyDto';
import { UpdateChronicResponseDto } from './dto/UpdateChronicResponseDto';

@ApiTags('Chronics - Хронические заболевания')
@Controller('chronics')
export class ChronicController {
  @Inject()
  private readonly chronicService: ChronicService;

  @Get('/')
  @ApiOperation({ summary: 'Список Хронические заболевания' })
  @ApiResponse({ status: HttpStatus.OK, type: GetManyChronicsResponseDto })
  async getManyChronics(
    @Query() query: GetManyChronicsQueryDto,
  ): Promise<GetManyChronicsResponseDto> {
    const [items, count] = await this.chronicService.findMany(query);

    return plainToClass(GetManyChronicsResponseDto, { items, meta: { count }});
  }

  @Get('/:chronicId')
  @ApiParam({ name: 'chronicId', type: Number })
  @ApiOperation({ summary: 'Получить один Хронические заболевания по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: GetChronicByIdResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getChronicById(
    @Param('chronicId', ParseIntPipe) chronicId: IChronic['id'],
      @Query() query: GetChronicByIdQueryDto,
  ): Promise<GetChronicByIdResponseDto> {
    const chronic = await this.chronicService.findByIdStrict(chronicId, query.relations);

    return plainToClass(GetChronicByIdResponseDto, chronic);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать Хронические заболевания' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateChronicResponseDto })
  async createChronic(
    @Body() createData: CreateChronicBodyDto,
      @Query() query: CreateChronicQueryDto,
  ): Promise<CreateChronicResponseDto> {
    const relationsForCreate = await this.getRelationsForUpsert(createData);

    const created = await this.chronicService.create(createData, relationsForCreate);

    const found = await this.chronicService.findByIdStrict(created.id, query.relations);

    return plainToClass(CreateChronicResponseDto, found);
  }

  @Patch('/:chronicId')
  @ApiParam({ name: 'chronicId', type: Number })
  @ApiOperation({ summary: 'Обновить Хронические заболевания' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateChronicResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async updateChronic(
    @Param('chronicId', ParseIntPipe) chronicId: IChronic['id'],
      @Body() updateData: UpdateChronicBodyDto,
      @Query() query: UpdateChronicQueryDto,
  ): Promise<UpdateChronicResponseDto> {
    const foundChronic = await this.chronicService.findByIdStrict(chronicId);

    const relationsForUpdate = await this.getRelationsForUpsert(updateData);

    await this.chronicService.update(foundChronic, updateData, relationsForUpdate);

    const found = await this.chronicService.findByIdStrict(chronicId, query.relations);

    return plainToClass(UpdateChronicResponseDto, found);
  }

  @Delete('/:chronicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'chronicId', type: Number })
  @ApiOperation({ summary: 'Удалить Хронические заболевания' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteChronic(
    @Param('chronicId', ParseIntPipe) chronicId: IChronic['id'],
  ) : Promise<void> {
    await this.chronicService.deleteById(chronicId);
  }

  private async getRelationsForUpsert(
    upsertData: IChronicCreateData | IChronicUpdateData,
  ): Promise<IChronicExtended> {
    const relations: IChronicExtended = {};

    // NOTE: example how to get relations for create or update actions
    // needed to inject someService in controller
    // replace this code for real implementation
    // if (upsertData.categoryIds) {
    //   const categories = await this.someService.findManyByIdsStrict(upsertData.categoryIds);
    //
    //   relations['categories'] = categories;
    // }

    return relations;
  }
}
