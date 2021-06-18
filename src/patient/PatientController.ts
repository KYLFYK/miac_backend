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

import { PatientService } from './PatientService';

import { IPatient } from './interfaces/IPatient';
import { IPatientExtended } from './interfaces/IPatientExtended';
import { IPatientCreateData } from './interfaces/IPatientCreateData';
import { IPatientUpdateData } from './interfaces/IPatientUpdateData';

import { GetPatientByIdQueryDto } from './dto/GetPatientByIdQueryDto';
import { GetPatientByIdResponseDto } from './dto/GetPatientByIdResponseDto';
import { GetManyPatientsQueryDto } from './dto/GetManyPatientsQueryDto';
import { GetManyPatientsResponseDto } from './dto/GetManyPatientsResponseDto';
import { CreatePatientQueryDto } from './dto/CreatePatientQueryDto';
import { CreatePatientBodyDto } from './dto/CreatePatientBodyDto';
import { CreatePatientResponseDto } from './dto/CreatePatientResponseDto';
import { UpdatePatientQueryDto } from './dto/UpdatePatientQueryDto';
import { UpdatePatientBodyDto } from './dto/UpdatePatientBodyDto';
import { UpdatePatientResponseDto } from './dto/UpdatePatientResponseDto';

@ApiTags('Patients - Пациент')
@Controller('patients')
export class PatientController {
  @Inject()
  private readonly patientService: PatientService;

  @Get('/')
  @ApiOperation({ summary: 'Список пациентов' })
  @ApiResponse({ status: HttpStatus.OK, type: GetManyPatientsResponseDto })
  async getManyPatients(
    @Query() query: GetManyPatientsQueryDto,
  ): Promise<GetManyPatientsResponseDto> {
    const [items, count] = await this.patientService.findMany(query);

    return plainToClass(GetManyPatientsResponseDto, { items, meta: { count }});
  }

  @Get('/:patientId')
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOperation({ summary: 'Получить одного пациента по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: GetPatientByIdResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getPatientById(
    @Param('patientId', ParseIntPipe) patientId: IPatient['id'],
      @Query() query: GetPatientByIdQueryDto,
  ): Promise<GetPatientByIdResponseDto> {
    const patient = await this.patientService.findByIdStrict(patientId, query.relations);

    return plainToClass(GetPatientByIdResponseDto, patient);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать пациента' })
  @ApiResponse({ status: HttpStatus.OK, type: CreatePatientResponseDto })
  async createPatient(
    @Body() createData: CreatePatientBodyDto,
      @Query() query: CreatePatientQueryDto,
  ): Promise<CreatePatientResponseDto> {
    const relationsForCreate = await this.getRelationsForUpsert(createData);

    const created = await this.patientService.create(createData, relationsForCreate);

    const found = await this.patientService.findByIdStrict(created.id, query.relations);

    return plainToClass(CreatePatientResponseDto, found);
  }

  @Patch('/:patientId')
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOperation({ summary: 'Обновить пациента' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdatePatientResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async updatePatient(
    @Param('patientId', ParseIntPipe) patientId: IPatient['id'],
      @Body() updateData: UpdatePatientBodyDto,
      @Query() query: UpdatePatientQueryDto,
  ): Promise<UpdatePatientResponseDto> {
    const foundPatient = await this.patientService.findByIdStrict(patientId);

    const relationsForUpdate = await this.getRelationsForUpsert(updateData);

    await this.patientService.update(foundPatient, updateData, relationsForUpdate);

    const found = await this.patientService.findByIdStrict(patientId, query.relations);

    return plainToClass(UpdatePatientResponseDto, found);
  }

  @Delete('/:patientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'patientId', type: Number })
  @ApiOperation({ summary: 'Удалить пациента' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deletePatient(
    @Param('patientId', ParseIntPipe) patientId: IPatient['id'],
  ) : Promise<void> {
    await this.patientService.deleteById(patientId);
  }

  private async getRelationsForUpsert(
    upsertData: IPatientCreateData | IPatientUpdateData,
  ): Promise<IPatientExtended> {
    const relations: IPatientExtended = {};

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
