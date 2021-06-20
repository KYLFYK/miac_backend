import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import {IActivity} from "../../activity/interfaces/IActivity";

export enum sexType {
  FEMALE = 'female',
  MALE = 'male'
}
export enum currentStatusType {
  NORMAL = 'Номальное',
  GOOD = 'Хорошее',
  SATISFACTORY = 'Удовлитворительное',
  BAD = 'Плохое',
}
export interface IPatient extends IBaseEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  weight: number;
  height: number;
  snils: string;
  age: number;
  sex: sexType;
  currentStatus: currentStatusType;
  isVerify: boolean;
}
