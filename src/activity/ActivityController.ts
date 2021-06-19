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

import { ActivityService } from './ActivityService';

import { IActivity } from './interfaces/IActivity';
import { IActivityExtended } from './interfaces/IActivityExtended';
import { IActivityCreateData } from './interfaces/IActivityCreateData';
import { IActivityUpdateData } from './interfaces/IActivityUpdateData';

import { GetActivityByIdQueryDto } from './dto/GetActivityByIdQueryDto';
import { GetActivityByIdResponseDto } from './dto/GetActivityByIdResponseDto';
import { GetManyActivitiesQueryDto } from './dto/GetManyActivitiesQueryDto';
import { GetManyActivitiesResponseDto } from './dto/GetManyActivitiesResponseDto';
import { CreateActivityQueryDto } from './dto/CreateActivityQueryDto';
import { CreateActivityBodyDto } from './dto/CreateActivityBodyDto';
import { CreateActivityResponseDto } from './dto/CreateActivityResponseDto';
import { UpdateActivityQueryDto } from './dto/UpdateActivityQueryDto';
import { UpdateActivityBodyDto } from './dto/UpdateActivityBodyDto';
import { UpdateActivityResponseDto } from './dto/UpdateActivityResponseDto';

@ApiTags('Activities - Активность')
@Controller('activities')
export class ActivityController {
  @Inject()
  private readonly activityService: ActivityService;

  @Get('/')
  @ApiOperation({ summary: 'Список Активность' })
  @ApiResponse({ status: HttpStatus.OK, type: GetManyActivitiesResponseDto })
  async getManyActivities(
    @Query() query: GetManyActivitiesQueryDto,
  ): Promise<GetManyActivitiesResponseDto> {
    const [items, count] = await this.activityService.findMany(query);

    return plainToClass(GetManyActivitiesResponseDto, { items, meta: { count }});
  }

  @Get('/:activityId')
  @ApiParam({ name: 'activityId', type: Number })
  @ApiOperation({ summary: 'Получить один Активность по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: GetActivityByIdResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getActivityById(
    @Param('activityId', ParseIntPipe) activityId: IActivity['id'],
      @Query() query: GetActivityByIdQueryDto,
  ): Promise<GetActivityByIdResponseDto> {
    const activity = await this.activityService.findByIdStrict(activityId, query.relations);

    return plainToClass(GetActivityByIdResponseDto, activity);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать Активность' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateActivityResponseDto })
  async createActivity(
    @Body() createData: CreateActivityBodyDto,
      @Query() query: CreateActivityQueryDto,
  ): Promise<CreateActivityResponseDto> {
    const relationsForCreate = await this.getRelationsForUpsert(createData);

    const created = await this.activityService.create(createData, relationsForCreate);

    const found = await this.activityService.findByIdStrict(created.id, query.relations);

    return plainToClass(CreateActivityResponseDto, found);
  }

  @Patch('/:activityId')
  @ApiParam({ name: 'activityId', type: Number })
  @ApiOperation({ summary: 'Обновить Активность' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateActivityResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async updateActivity(
    @Param('activityId', ParseIntPipe) activityId: IActivity['id'],
      @Body() updateData: UpdateActivityBodyDto,
      @Query() query: UpdateActivityQueryDto,
  ): Promise<UpdateActivityResponseDto> {
    const foundActivity = await this.activityService.findByIdStrict(activityId);

    const relationsForUpdate = await this.getRelationsForUpsert(updateData);

    await this.activityService.update(foundActivity, updateData, relationsForUpdate);

    const found = await this.activityService.findByIdStrict(activityId, query.relations);

    return plainToClass(UpdateActivityResponseDto, found);
  }

  @Delete('/:activityId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'activityId', type: Number })
  @ApiOperation({ summary: 'Удалить Активность' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteActivity(
    @Param('activityId', ParseIntPipe) activityId: IActivity['id'],
  ) : Promise<void> {
    await this.activityService.deleteById(activityId);
  }

  private async getRelationsForUpsert(
    upsertData: IActivityCreateData | IActivityUpdateData,
  ): Promise<IActivityExtended> {
    const relations: IActivityExtended = {};

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
