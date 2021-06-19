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

import { DoctorService } from './DoctorService';

import { IDoctor } from './interfaces/IDoctor';
import { IDoctorExtended } from './interfaces/IDoctorExtended';
import { IDoctorCreateData } from './interfaces/IDoctorCreateData';
import { IDoctorUpdateData } from './interfaces/IDoctorUpdateData';

import { GetDoctorByIdQueryDto } from './dto/GetDoctorByIdQueryDto';
import { GetDoctorByIdResponseDto } from './dto/GetDoctorByIdResponseDto';
import { GetManyDoctorsQueryDto } from './dto/GetManyDoctorsQueryDto';
import { GetManyDoctorsResponseDto } from './dto/GetManyDoctorsResponseDto';
import { CreateDoctorQueryDto } from './dto/CreateDoctorQueryDto';
import { CreateDoctorBodyDto } from './dto/CreateDoctorBodyDto';
import { CreateDoctorResponseDto } from './dto/CreateDoctorResponseDto';
import { UpdateDoctorQueryDto } from './dto/UpdateDoctorQueryDto';
import { UpdateDoctorBodyDto } from './dto/UpdateDoctorBodyDto';
import { UpdateDoctorResponseDto } from './dto/UpdateDoctorResponseDto';
import {PatientService} from "../patient/PatientService";

@ApiTags('Doctors - Доктор')
@Controller('doctors')
export class DoctorController {
  @Inject()
  private readonly doctorService: DoctorService;

  @Inject()
  private readonly patientService: PatientService;

  @Get('/')
  @ApiOperation({ summary: 'Список Доктор' })
  @ApiResponse({ status: HttpStatus.OK, type: GetManyDoctorsResponseDto })
  async getManyDoctors(
  ): Promise<GetManyDoctorsResponseDto> {
    const [items, count] = await this.doctorService.findMany();

    return plainToClass(GetManyDoctorsResponseDto, { items, meta: { count }});
  }

  @Get('/:doctorId')
  @ApiParam({ name: 'doctorId', type: Number })
  @ApiOperation({ summary: 'Получить один Доктор по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, type: GetDoctorByIdResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getDoctorById(
    @Param('doctorId', ParseIntPipe) doctorId: IDoctor['id'],
      @Query() query: GetDoctorByIdQueryDto,
  ): Promise<GetDoctorByIdResponseDto> {
    const doctor = await this.doctorService.findByIdStrict(doctorId, query.relations);

    return plainToClass(GetDoctorByIdResponseDto, doctor);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Создать Доктор' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateDoctorResponseDto })
  async createDoctor(
    @Body() createData: CreateDoctorBodyDto,
      @Query() query: CreateDoctorQueryDto,
  ): Promise<CreateDoctorResponseDto> {
    const relationsForCreate = await this.getRelationsForUpsert(createData);

    const created = await this.doctorService.create(createData, relationsForCreate);

    const found = await this.doctorService.findByIdStrict(created.id, query.relations);

    return plainToClass(CreateDoctorResponseDto, found);
  }

  @Patch('/:doctorId')
  @ApiParam({ name: 'doctorId', type: Number })
  @ApiOperation({ summary: 'Обновить Доктор' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateDoctorResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async updateDoctor(
    @Param('doctorId', ParseIntPipe) doctorId: IDoctor['id'],
      @Body() updateData: UpdateDoctorBodyDto,
      @Query() query: UpdateDoctorQueryDto,
  ): Promise<UpdateDoctorResponseDto> {
    const foundDoctor = await this.doctorService.findByIdStrict(doctorId);

    const relationsForUpdate = await this.getRelationsForUpsert(updateData);

    await this.doctorService.update(foundDoctor, updateData, relationsForUpdate);

    const found = await this.doctorService.findByIdStrict(doctorId, query.relations);

    return plainToClass(UpdateDoctorResponseDto, found);
  }

  @Delete('/:doctorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'doctorId', type: Number })
  @ApiOperation({ summary: 'Удалить Доктор' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteDoctor(
    @Param('doctorId', ParseIntPipe) doctorId: IDoctor['id'],
  ) : Promise<void> {
    await this.doctorService.deleteById(doctorId);
  }

  private async getRelationsForUpsert(
    upsertData: IDoctorCreateData | IDoctorUpdateData,
  ): Promise<IDoctorExtended> {
    const relations: IDoctorExtended = {};

    if( upsertData.patientIds) {
      const patients = await this.patientService.findManyByIdsStrict(upsertData.patientIds)

      relations['patients'] = patients
    }



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
