import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IPatient } from './IPatient';

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
| 'id'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPatientCreateData extends Omit<IPatient, OMIT_FIELDS> {
}
