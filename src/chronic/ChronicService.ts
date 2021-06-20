import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { EChronicNotFound } from './exceptions/EChronicNotFound';
import { EChronicNotFoundMany } from './exceptions/EChronicNotFoundMany';

import { IGetManyQueryDto } from '../common/interfaces/IGetManyQueryDto';
import { IChronic } from './interfaces/IChronic';
import { IChronicExtended } from './interfaces/IChronicExtended';
import { IChronicCreateData } from './interfaces/IChronicCreateData';
import { IChronicUpdateData } from './interfaces/IChronicUpdateData';

import { ChronicEntity } from './entities/ChronicEntity';

@Injectable()
export class ChronicService {
  constructor(
    @InjectRepository(ChronicEntity)
    private chronicRepository: Repository<ChronicEntity>,
  ) {}

  async findById(id: IChronic['id'], relations?: string[]): Promise<ChronicEntity> {
    return this.chronicRepository.findOne(id, {
      relations,
    });
  }

  async findBy(fields: Partial<IChronic>): Promise<ChronicEntity> {
    return this.chronicRepository.findOne({
      ...fields,
    });
  }

  async findByIdStrict(id: IChronic['id'], relations?: string[]): Promise<ChronicEntity> {
    const foundChronic = await this.findById(id, relations);

    if (!foundChronic) {
      throw new EChronicNotFound(id);
    }

    return foundChronic;
  }

  async findMany(query: IGetManyQueryDto<ChronicEntity>): Promise<[ChronicEntity[], number]> {
    return this.chronicRepository.findAndCount(query);
  }

  async findManyByIds(ids: IChronic['id'][]): Promise<ChronicEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.chronicRepository.findByIds(ids);
  }

  async findManyByIdsStrict(ids: IChronic['id'][]): Promise<ChronicEntity[]> {
    const chronics = await this.findManyByIds(ids);

    if (chronics.length !== ids.length) {
      const foundChronicIds = chronics.map(item => item.id);
      const notFoundChronicIds = difference(ids, foundChronicIds);

      throw new EChronicNotFoundMany(notFoundChronicIds);
    }

    return chronics;
  }

  async create(
    createData: IChronicCreateData,
    relations: IChronicExtended,
  ): Promise<ChronicEntity> {
    return this.chronicRepository.save({
      ...createData,
      ...relations,
    });
  }

  async update(
    chronic: ChronicEntity,
    updateData: IChronicUpdateData,
    relations: IChronicExtended,
  ): Promise<ChronicEntity> {
    const updatedChronic = this.chronicRepository.merge(
      chronic,
      updateData,
      relations,
    );

    return this.chronicRepository.save(updatedChronic);
  }

  async deleteById(id: IChronic['id']): Promise<void> {
    await this.chronicRepository.delete(id);
  }
}
