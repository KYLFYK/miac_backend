import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IPatient } from './IPatient';
import {IChronic} from "../../chronic/interfaces/IChronic";

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPatientUpdateData extends Omit<IPatient, OMIT_FIELDS> {
  chronicIds: IChronic['id'][];
}
