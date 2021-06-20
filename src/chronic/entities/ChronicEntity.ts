import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IChronic } from '../interfaces/IChronic';
import { IChronicExtended } from '../interfaces/IChronicExtended';

@Entity('chronics')
export class ChronicEntity implements IChronic, IChronicExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
