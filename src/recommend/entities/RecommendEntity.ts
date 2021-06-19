import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { IRecommend } from '../interfaces/IRecommend';
import { IRecommendExtended } from '../interfaces/IRecommendExtended';
import {DoctorEntity} from "../../doctor/entities/DoctorEntity";
import {PatientEntity} from "../../patient/entities/PatientEntity";

@Entity('recommends')
export class RecommendEntity implements IRecommend, IRecommendExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  patientId: number;

  @ManyToOne(() => PatientEntity, patient => patient.id)
  patient: PatientEntity

  @Column()
  ownerId: number;

  @ManyToOne(() => DoctorEntity, doctor => doctor.id)
  owner: DoctorEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
