import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { difference } from 'lodash';

import { EActivityNotFound } from './exceptions/EActivityNotFound';
import { EActivityNotFoundMany } from './exceptions/EActivityNotFoundMany';

import { IGetManyQueryDto } from '../common/interfaces/IGetManyQueryDto';
import { IActivity } from './interfaces/IActivity';
import { IActivityExtended } from './interfaces/IActivityExtended';
import { IActivityCreateData } from './interfaces/IActivityCreateData';
import { IActivityUpdateData } from './interfaces/IActivityUpdateData';

import { ActivityEntity } from './entities/ActivityEntity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
  ) {}

  async findById(id: IActivity['id'], relations?: string[]): Promise<ActivityEntity> {
    return this.activityRepository.findOne(id, {
      relations,
    });
  }

  async findBy(fields: Partial<IActivity>): Promise<ActivityEntity> {
    return this.activityRepository.findOne({
      ...fields,
    });
  }

  async findByIdStrict(id: IActivity['id'], relations?: string[]): Promise<ActivityEntity> {
    const foundActivity = await this.findById(id, relations);

    if (!foundActivity) {
      throw new EActivityNotFound(id);
    }

    return foundActivity;
  }

  async findMany(query: IGetManyQueryDto<ActivityEntity>): Promise<[ActivityEntity[], number]> {
    return this.activityRepository.findAndCount(query.getFindOptions());
  }

  async findManyByIds(ids: IActivity['id'][]): Promise<ActivityEntity[]> {
    if (ids.length === 0) {
      return [];
    }

    return this.activityRepository.findByIds(ids);
  }

  async findManyByIdsStrict(ids: IActivity['id'][]): Promise<ActivityEntity[]> {
    const activities = await this.findManyByIds(ids);

    if (activities.length !== ids.length) {
      const foundActivityIds = activities.map(item => item.id);
      const notFoundActivityIds = difference(ids, foundActivityIds);

      throw new EActivityNotFoundMany(notFoundActivityIds);
    }

    return activities;
  }

  async create(
    createData: IActivityCreateData,
    relations: IActivityExtended,
  ): Promise<ActivityEntity> {
    return this.activityRepository.save({
      ...createData,
      ...relations,
    });
  }

  async update(
    activity: ActivityEntity,
    updateData: IActivityUpdateData,
    relations: IActivityExtended,
  ): Promise<ActivityEntity> {
    const updatedActivity = this.activityRepository.merge(
      activity,
      updateData,
      relations,
    );

    return this.activityRepository.save(updatedActivity);
  }

  async deleteById(id: IActivity['id']): Promise<void> {
    await this.activityRepository.delete(id);
  }
}
