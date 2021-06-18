import { IBaseEntity } from '../../common/interfaces/IBaseEntity';

export interface IRecords extends IBaseEntity {
  id: number;
  sys: number;
  dia: number;
  heartRate: number;
  feeling: string;
}
