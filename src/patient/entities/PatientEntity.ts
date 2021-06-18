import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IPatient } from '../interfaces/IPatient';
import { IPatientExtended } from '../interfaces/IPatientExtended';

@Entity('patients')
export class PatientEntity implements IPatient, IPatientExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
