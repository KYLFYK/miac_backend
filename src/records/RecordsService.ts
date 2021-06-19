import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, Repository} from 'typeorm';
import { difference } from 'lodash';

import { ERecordsNotFound } from './exceptions/ERecordsNotFound';
import { ERecordsNotFoundMany } from './exceptions/ERecordsNotFoundMany';

import { IGetManyQueryDto } from '../common/interfaces/IGetManyQueryDto';
import { IRecords } from './interfaces/IRecords';
import { IRecordsExtended } from './interfaces/IRecordsExtended';
import { IRecordsCreateData } from './interfaces/IRecordsCreateData';
import { IRecordsUpdateData } from './interfaces/IRecordsUpdateData';

import { RecordsEntity } from './entities/RecordsEntity';
import {IPatient} from "../patient/interfaces/IPatient";
import {PatientService} from "../patient/PatientService";
import {PatientEntity} from "../patient/entities/PatientEntity";

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(RecordsEntity)
    private recordsRepository: Repository<RecordsEntity>,

    @Inject(forwardRef(() => PatientService))
    private patientService: PatientService,
  ) {}

  async findById(id: IRecords['id'], relations?: string[]): Promise<RecordsEntity> {
    return this.recordsRepository.findOne(id, {
      relations,
    });
  }

  async findBy(fields: Partial<IRecords>): Promise<RecordsEntity> {
    return this.recordsRepository.findOne({
      ...fields,
    });
  }

  async findByOwner(ownerId: IPatient['id'], query): Promise<RecordsEntity[]> {
    console.log(query)
    const data = await this.recordsRepository.find({
      where: {
        ownerId: ownerId,
        createdAt: Between(query.dateStart, query.dateEnd)
      },
      ...query
    })

    return data
  }

  async findByIdStrict(id: IRecords['id'], relations?: string[]): Promise<RecordsEntity> {
    const foundRecords = await this.findById(id, relations);

    if (!foundRecords) {
      throw new ERecordsNotFound(id);
    }

    return foundRecords;
  }

  async findMany(query: IGetManyQueryDto<RecordsEntity>): Promise<[RecordsEntity[], number]> {
    return this.recordsRepository.findAndCount({relations: ['owner']});
  }

  async findManyByIds(ids: IRecords['id'][]): Promise<RecordsEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.recordsRepository.findByIds(ids);
  }

  async findManyByIdsStrict(ids: IRecords['id'][]): Promise<RecordsEntity[]> {
    const records = await this.findManyByIds(ids);

    if (records.length !== ids.length) {
      const foundRecordsIds = records.map(item => item.id);
      const notFoundRecordsIds = difference(ids, foundRecordsIds);

      throw new ERecordsNotFoundMany(notFoundRecordsIds);
    }

    return records;
  }

  async create(
    createData: IRecordsCreateData,
    relations: IRecordsExtended,
  ): Promise<RecordsEntity> {
    return this.recordsRepository.save(createData);
  }

  async update(
    records: RecordsEntity,
    updateData: IRecordsUpdateData,
    relations: IRecordsExtended,
  ): Promise<RecordsEntity> {
    const updatedRecords = this.recordsRepository.merge(
      records,
      updateData,
      relations,
    );

    return this.recordsRepository.save(updatedRecords);
  }

  async deleteById(id: IRecords['id']): Promise<void> {
    await this.recordsRepository.delete(id);
  }
}
