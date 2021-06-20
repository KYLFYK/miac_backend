import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable, ManyToOne,
} from 'typeorm';

import {currentStatusType, IPatient, sexType} from '../interfaces/IPatient';
import { IPatientExtended } from '../interfaces/IPatientExtended';
import {RecordsEntity} from "../../records/entities/RecordsEntity";
import {ActivityEntity} from "../../activity/entities/ActivityEntity";
import {ChronicEntity} from "../../chronic/entities/ChronicEntity";

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

  @Column({ type: "enum", enum: currentStatusType, default: currentStatusType.NORMAL})
  currentStatus: currentStatusType;

  @ManyToMany(() => ChronicEntity, chronic => chronic.id)
  @JoinTable({
    name: 'chronic_to_patient'
  })
  chronic: ChronicEntity[];

  @Column()
  height: number;

  @Column()
  snils: string;

  @ManyToMany(() => RecordsEntity)
  @JoinTable()
  records: RecordsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
