import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable,
} from 'typeorm';

import { IRecords } from '../interfaces/IRecords';
import { IRecordsExtended } from '../interfaces/IRecordsExtended';
import {PatientEntity} from "../../patient/entities/PatientEntity";

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

  @Column()
  ownerId: PatientEntity['id'];

  @ManyToOne(() => PatientEntity, patient => patient.id)
  owner: PatientEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
