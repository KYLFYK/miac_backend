import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { EPatientNotFound } from './exceptions/EPatientNotFound';
import { EPatientNotFoundMany } from './exceptions/EPatientNotFoundMany';

import { IGetManyQueryDto } from '../common/interfaces/IGetManyQueryDto';
import { IPatient } from './interfaces/IPatient';
import { IPatientExtended } from './interfaces/IPatientExtended';
import { IPatientCreateData } from './interfaces/IPatientCreateData';
import { IPatientUpdateData } from './interfaces/IPatientUpdateData';

import { PatientEntity } from './entities/PatientEntity';
import {ChronicEntity} from "../chronic/entities/ChronicEntity";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
    @InjectRepository(PatientEntity)
    private chronicRepository: Repository<ChronicEntity>,
  ) {}

  async findById(id: IPatient['id'], relations?: string[]): Promise<PatientEntity> {
    return this.patientRepository.findOne(id, {
      relations,
    });
  }

  async findBy(fields: Partial<IPatient>): Promise<PatientEntity> {
    return this.patientRepository.findOne({
      ...fields,
    });
  }

  async findByIdStrict(id: IPatient['id'], relations?: string[]): Promise<PatientEntity> {
    const foundPatient = await this.findById(id, relations);

    if (!foundPatient) {
      throw new EPatientNotFound(id);
    }

    return foundPatient;
  }

  async findMany(query: IGetManyQueryDto<PatientEntity>): Promise<[PatientEntity[], number]> {
    return this.patientRepository.findAndCount({
      relations: ['chronic']
    });
  }

  async findManyByIds(ids: IPatient['id'][]): Promise<PatientEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.patientRepository.findByIds(ids);
  }

  async findManyByIdsStrict(ids: IPatient['id'][]): Promise<PatientEntity[]> {
    const patients = await this.findManyByIds(ids);

    if (patients.length !== ids.length) {
      const foundPatientIds = patients.map(item => item.id);
      const notFoundPatientIds = difference(ids, foundPatientIds);

      throw new EPatientNotFoundMany(notFoundPatientIds);
    }

    return patients;
  }

  async create(
    createData: IPatientCreateData,
    relations: IPatientExtended,
  ): Promise<PatientEntity> {

    const chronic = await this.chronicRepository.findByIds(createData.chronicIds);

    return this.patientRepository.save({
      ...createData,
      chronic: chronic,
      ...relations,
    });
  }

  async update(
    patient: PatientEntity,
    updateData: IPatientUpdateData,
    relations: IPatientExtended,
  ): Promise<PatientEntity> {
    const updatedPatient = this.patientRepository.merge(
      patient,
      updateData,
      relations,
    );

    return this.patientRepository.save(updatedPatient);
  }

  async deleteById(id: IPatient['id']): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
