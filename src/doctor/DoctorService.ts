import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { EDoctorNotFound } from './exceptions/EDoctorNotFound';
import { EDoctorNotFoundMany } from './exceptions/EDoctorNotFoundMany';

import { IGetManyQueryDto } from '../common/interfaces/IGetManyQueryDto';
import { IDoctor } from './interfaces/IDoctor';
import { IDoctorExtended } from './interfaces/IDoctorExtended';
import { IDoctorCreateData } from './interfaces/IDoctorCreateData';
import { IDoctorUpdateData } from './interfaces/IDoctorUpdateData';

import { DoctorEntity } from './entities/DoctorEntity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
  ) {}

  async findById(id: IDoctor['id'], relations?: string[]): Promise<DoctorEntity> {
    return this.doctorRepository.findOne(id, {
      relations,
    });
  }

  async findBy(fields: Partial<IDoctor>): Promise<DoctorEntity> {
    return this.doctorRepository.findOne({
      ...fields,
    });
  }

  async findByIdStrict(id: IDoctor['id'], relations?: string[]): Promise<DoctorEntity> {
    const foundDoctor = await this.findById(id, relations);

    if (!foundDoctor) {
      throw new EDoctorNotFound(id);
    }

    return foundDoctor;
  }

  async findMany(): Promise<[DoctorEntity[], number]> {
    return this.doctorRepository.findAndCount();
  }

  async findManyByIds(ids: IDoctor['id'][]): Promise<DoctorEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.doctorRepository.findByIds(ids);
  }

  async findManyByIdsStrict(ids: IDoctor['id'][]): Promise<DoctorEntity[]> {
    const doctors = await this.findManyByIds(ids);

    if (doctors.length !== ids.length) {
      const foundDoctorIds = doctors.map(item => item.id);
      const notFoundDoctorIds = difference(ids, foundDoctorIds);

      throw new EDoctorNotFoundMany(notFoundDoctorIds);
    }

    return doctors;
  }

  async create(
    createData: IDoctorCreateData,
    relations: IDoctorExtended,
  ): Promise<DoctorEntity> {
    return this.doctorRepository.save({
      ...createData,
      ...relations,
    });
  }

  async update(
    doctor: DoctorEntity,
    updateData: IDoctorUpdateData,
    relations: IDoctorExtended,
  ): Promise<DoctorEntity> {
    const updatedDoctor = this.doctorRepository.merge(
      doctor,
      updateData,
      relations,
    );

    return this.doctorRepository.save(updatedDoctor);
  }

  async deleteById(id: IDoctor['id']): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
