import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable,
} from 'typeorm';

import {IPatient, sexType} from '../interfaces/IPatient';
import { IPatientExtended } from '../interfaces/IPatientExtended';
import {RecordsEntity} from "../../records/entities/RecordsEntity";

@Entity('patients')
export class PatientEntity implements IPatient, IPatientExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  isVerify: boolean;

  @Column()
  lastName: string;

  @Column({ default: '+79999999999'})
  phone: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column({ type: 'enum', enum: sexType, default: sexType.MALE})
  sex: sexType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
