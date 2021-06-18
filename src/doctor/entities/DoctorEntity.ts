import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';

import { IDoctor } from '../interfaces/IDoctor';
import { IDoctorExtended } from '../interfaces/IDoctorExtended';
import {PatientEntity} from "../../patient/entities/PatientEntity";

@Entity('doctors')
export class DoctorEntity implements Omit<IDoctor, 'patientIds'>, IDoctorExtended {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @ManyToMany(() => PatientEntity)
  @JoinTable({
    name: 'doctor_to_patient'
  })
  patients: PatientEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
