import { IBaseEntity } from '../../common/interfaces/IBaseEntity';

export enum sexType {
  FEMALE = 'female',
  MALE = 'male'
}
export interface IPatient extends IBaseEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  weight: number;
  age: number;
  sex: sexType;
  isVerify: boolean;
}
