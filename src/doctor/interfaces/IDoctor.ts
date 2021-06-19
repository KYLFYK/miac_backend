import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import {IPatient} from "../../patient/interfaces/IPatient";

export interface IDoctor extends IBaseEntity {
  firstName: string;
  lastName: string;
  phone?: string;
  patientIds?: IPatient["id"][];
}
