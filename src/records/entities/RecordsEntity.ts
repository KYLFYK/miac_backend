import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IRecords } from '../interfaces/IRecords';
import { IRecordsExtended } from '../interfaces/IRecordsExtended';

@Entity('records')
export class RecordsEntity implements IRecords, IRecordsExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sys: number;

  @Column()
  dia: number;

  @Column()
  heartRate: number;

  @Column()
  feeling: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
