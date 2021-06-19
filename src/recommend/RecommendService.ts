import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { ERecommendNotFound } from './exceptions/ERecommendNotFound';
import { ERecommendNotFoundMany } from './exceptions/ERecommendNotFoundMany';

import { IGetManyQueryDto } from '../common/interfaces/IGetManyQueryDto';
import { IRecommend } from './interfaces/IRecommend';
import { IRecommendExtended } from './interfaces/IRecommendExtended';
import { IRecommendCreateData } from './interfaces/IRecommendCreateData';
import { IRecommendUpdateData } from './interfaces/IRecommendUpdateData';

import { RecommendEntity } from './entities/RecommendEntity';

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(RecommendEntity)
    private recommendRepository: Repository<RecommendEntity>,
  ) {}

  async findById(id: IRecommend['id'], relations?: string[]): Promise<RecommendEntity> {
    return this.recommendRepository.findOne(id, {
      relations,
    });
  }

  async findBy(fields: Partial<IRecommend>): Promise<RecommendEntity> {
    return this.recommendRepository.findOne({
      ...fields,
    });
  }

  async findByIdStrict(id: IRecommend['id'], relations?: string[]): Promise<RecommendEntity> {
    const foundRecommend = await this.findById(id, relations);

    if (!foundRecommend) {
      throw new ERecommendNotFound(id);
    }

    return foundRecommend;
  }

  async findMany(query: IGetManyQueryDto<RecommendEntity>): Promise<[RecommendEntity[], number]> {
    return this.recommendRepository.findAndCount({
      ...query,
      relations: ['owner','patient']
    });
  }

  async findManyByIds(ids: IRecommend['id'][]): Promise<RecommendEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.recommendRepository.findByIds(ids);
  }

  async findManyByIdsStrict(ids: IRecommend['id'][]): Promise<RecommendEntity[]> {
    const recommends = await this.findManyByIds(ids);

    if (recommends.length !== ids.length) {
      const foundRecommendIds = recommends.map(item => item.id);
      const notFoundRecommendIds = difference(ids, foundRecommendIds);

      throw new ERecommendNotFoundMany(notFoundRecommendIds);
    }

    return recommends;
  }

  async create(
    createData: IRecommendCreateData,
    relations: IRecommendExtended,
  ): Promise<RecommendEntity> {
    return this.recommendRepository.save({
      ...createData,
      ...relations,
    });
  }

  async update(
    recommend: RecommendEntity,
    updateData: IRecommendUpdateData,
    relations: IRecommendExtended,
  ): Promise<RecommendEntity> {
    const updatedRecommend = this.recommendRepository.merge(
      recommend,
      updateData,
      relations,
    );

    return this.recommendRepository.save(updatedRecommend);
  }

  async deleteById(id: IRecommend['id']): Promise<void> {
    await this.recommendRepository.delete(id);
  }
}
