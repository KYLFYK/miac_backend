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

import { RecommendService } from './RecommendService';

import { IRecommend } from './interfaces/IRecommend';
import { IRecommendExtended } from './interfaces/IRecommendExtended';
import { IRecommendCreateData } from './interfaces/IRecommendCreateData';
import { IRecommendUpdateData } from './interfaces/IRecommendUpdateData';

import { GetRecommendByIdQueryDto } from './dto/GetRecommendByIdQueryDto';
import { GetRecommendByIdResponseDto } from './dto/GetRecommendByIdResponseDto';
import { GetManyRecommendsQueryDto } from './dto/GetManyRecommendsQueryDto';
import { GetManyRecommendsResponseDto } from './dto/GetManyRecommendsResponseDto';
import { CreateRecommendQueryDto } from './dto/CreateRecommendQueryDto';
import { CreateRecommendBodyDto } from './dto/CreateRecommendBodyDto';
import { CreateRecommendResponseDto } from './dto/CreateRecommendResponseDto';
import { UpdateRecommendQueryDto } from './dto/UpdateRecommendQueryDto';
import { UpdateRecommendBodyDto } from './dto/UpdateRecommendBodyDto';
import { UpdateRecommendResponseDto } from './dto/UpdateRecommendResponseDto';

@ApiTags('Recommends - Рекомендации')
@Controller('recommends')
export class RecommendController {
  @Inject()
  private readonly recommendService: RecommendService;

  @Get('/')
  @ApiOperation({ summary: 'Список Рекомендации' })
  @ApiResponse({ status: HttpStatus.OK, type: GetManyRecommendsResponseDto })
  async getManyRecommends(
    @Query() query: GetManyRecommendsQueryDto,
  ): Promise<GetManyRecommendsResponseDto> {
    const [items, count] = await this.recommendService.findMany(query);

    return plainToClass(GetManyRecommendsResponseDto, { items, meta: { count }});
  }

  @Get('/:recommendId')
  @ApiParam({ name: 'recommendId', type: Number })
  @ApiOperation({ summary: 'Получить один Рекомендации по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: GetRecommendByIdResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getRecommendById(
    @Param('recommendId', ParseIntPipe) recommendId: IRecommend['id'],
      @Query() query: GetRecommendByIdQueryDto,
  ): Promise<GetRecommendByIdResponseDto> {
    const recommend = await this.recommendService.findByIdStrict(recommendId, query.relations);

    return plainToClass(GetRecommendByIdResponseDto, recommend);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать Рекомендации' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateRecommendResponseDto })
  async createRecommend(
    @Body() createData: CreateRecommendBodyDto,
      @Query() query: CreateRecommendQueryDto,
  ): Promise<CreateRecommendResponseDto> {
    const relationsForCreate = await this.getRelationsForUpsert(createData);

    const created = await this.recommendService.create(createData, relationsForCreate);

    const found = await this.recommendService.findByIdStrict(created.id, query.relations);

    return plainToClass(CreateRecommendResponseDto, found);
  }

  @Patch('/:recommendId')
  @ApiParam({ name: 'recommendId', type: Number })
  @ApiOperation({ summary: 'Обновить Рекомендации' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateRecommendResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async updateRecommend(
    @Param('recommendId', ParseIntPipe) recommendId: IRecommend['id'],
      @Body() updateData: UpdateRecommendBodyDto,
      @Query() query: UpdateRecommendQueryDto,
  ): Promise<UpdateRecommendResponseDto> {
    const foundRecommend = await this.recommendService.findByIdStrict(recommendId);

    const relationsForUpdate = await this.getRelationsForUpsert(updateData);

    await this.recommendService.update(foundRecommend, updateData, relationsForUpdate);

    const found = await this.recommendService.findByIdStrict(recommendId, query.relations);

    return plainToClass(UpdateRecommendResponseDto, found);
  }

  @Delete('/:recommendId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'recommendId', type: Number })
  @ApiOperation({ summary: 'Удалить Рекомендации' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteRecommend(
    @Param('recommendId', ParseIntPipe) recommendId: IRecommend['id'],
  ) : Promise<void> {
    await this.recommendService.deleteById(recommendId);
  }

  private async getRelationsForUpsert(
    upsertData: IRecommendCreateData | IRecommendUpdateData,
  ): Promise<IRecommendExtended> {
    const relations: IRecommendExtended = {};

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
