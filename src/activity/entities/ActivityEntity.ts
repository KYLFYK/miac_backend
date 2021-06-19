import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IActivity } from '../interfaces/IActivity';
import { IActivityExtended } from '../interfaces/IActivityExtended';

@Entity('activities')
export class ActivityEntity implements IActivity, IActivityExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
