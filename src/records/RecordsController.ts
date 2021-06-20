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
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {format, formatISO} from 'date-fns'

import { RecordsService } from './RecordsService';

import { IRecords } from './interfaces/IRecords';
import { IRecordsExtended } from './interfaces/IRecordsExtended';
import { IRecordsCreateData } from './interfaces/IRecordsCreateData';
import { IRecordsUpdateData } from './interfaces/IRecordsUpdateData';

import { GetRecordsByIdQueryDto } from './dto/GetRecordsByIdQueryDto';
import { GetRecordsByIdResponseDto } from './dto/GetRecordsByIdResponseDto';
import { GetManyRecordsQueryDto } from './dto/GetManyRecordsQueryDto';
import { GetManyRecordsResponseDto } from './dto/GetManyRecordsResponseDto';
import { CreateRecordsQueryDto } from './dto/CreateRecordsQueryDto';
import { CreateRecordsBodyDto } from './dto/CreateRecordsBodyDto';
import { CreateRecordsResponseDto } from './dto/CreateRecordsResponseDto';
import { UpdateRecordsQueryDto } from './dto/UpdateRecordsQueryDto';
import { UpdateRecordsBodyDto } from './dto/UpdateRecordsBodyDto';
import { UpdateRecordsResponseDto } from './dto/UpdateRecordsResponseDto';
import {PatientService} from "../patient/PatientService";
import {QueryDto} from "../patient/dto/QueryDto";
import {GetManyRecordsByOwnerDto} from "../patient/dto/GetMenyRecordsByOwnerDto";

@ApiTags('Records - Журнал записи')
@Controller('records')
export class RecordsController {
  @Inject()
  private readonly recordsService: RecordsService;

  @Inject()
  private readonly patientService: PatientService;

  @Get('/')
  @ApiOperation({ summary: 'Список записей в журнале' })
  @ApiResponse({ status: HttpStatus.OK, type: GetManyRecordsResponseDto })
  async getManyRecords(
    @Query() query: GetManyRecordsQueryDto,
  ): Promise<GetManyRecordsResponseDto> {
    const [items, count] = await this.recordsService.findMany(query);

    return plainToClass(GetManyRecordsResponseDto, { items, meta: { count }});
  }

  @Get('/byOwner/:ownerId')
  @ApiParam({ name: 'ownerId', type: Number })
  @ApiQuery({ name: 'take', type: Number, example: 20, required: false})
  @ApiQuery({ name: 'limit', type: Number, example: 0, required: false})
  @ApiQuery({ name: 'dateEnd', type: String, example: formatISO(new Date)})
  @ApiQuery({ name: 'dateStart', type: String, example: formatISO(new Date)})
  @ApiOperation({ summary: 'Получить все записи из журнала принадлежащие пациенту' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getRecordsByOwner(
    @Query() query: QueryDto,
    @Param('ownerId', ParseIntPipe) ownerId: number
  ): Promise<any> {
    const records = await this.recordsService.findByOwner(ownerId, query);

    return {
      items: records
    }
  }

  @Get('/:recordsId')
  @ApiParam({ name: 'recordsId', type: Number })
  @ApiOperation({ summary: 'Получить одину запись из журнала по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: GetRecordsByIdResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getRecordsById(
    @Param('recordsId', ParseIntPipe) recordsId: IRecords['id'],
      @Query() query: GetRecordsByIdQueryDto,
  ): Promise<GetRecordsByIdResponseDto> {
    const records = await this.recordsService.findByIdStrict(recordsId, query.relations);

    return plainToClass(GetRecordsByIdResponseDto, records);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать запись в журнале' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateRecordsResponseDto })
  async createRecords(
    @Body() createData: CreateRecordsBodyDto,
      @Query() query: CreateRecordsQueryDto,
  ): Promise<CreateRecordsResponseDto> {
    const relationsForCreate = await this.getRelationsForUpsert(createData);

    const created = await this.recordsService.create(createData, relationsForCreate);

    const found = await this.recordsService.findByIdStrict(created.id, query.relations);

    return plainToClass(CreateRecordsResponseDto, found);
  }

  @Patch('/:recordsId')
  @ApiParam({ name: 'recordsId', type: Number })
  @ApiOperation({ summary: 'Обновить запись в журнале' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateRecordsResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async updateRecords(
    @Param('recordsId', ParseIntPipe) recordsId: IRecords['id'],
      @Body() updateData: UpdateRecordsBodyDto,
      @Query() query: UpdateRecordsQueryDto,
  ): Promise<UpdateRecordsResponseDto> {
    const foundRecords = await this.recordsService.findByIdStrict(recordsId);

    const relationsForUpdate = await this.getRelationsForUpsert(updateData);

    await this.recordsService.update(foundRecords, updateData, relationsForUpdate);

    const found = await this.recordsService.findByIdStrict(recordsId, query.relations);

    return plainToClass(UpdateRecordsResponseDto, found);
  }

  @Delete('/:recordsId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'recordsId', type: Number })
  @ApiOperation({ summary: 'Удалить запись в журнале' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteRecords(
    @Param('recordsId', ParseIntPipe) recordsId: IRecords['id'],
  ) : Promise<void> {
    await this.recordsService.deleteById(recordsId);
  }

  private async getRelationsForUpsert(
    upsertData: IRecordsCreateData | IRecordsUpdateData,
  ): Promise<IRecordsExtended> {
    const relations: IRecordsExtended = {};

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
