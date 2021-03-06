import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IRecords } from './IRecords';
import {IPatient} from "../../patient/interfaces/IPatient";

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecordsCreateData extends Omit<IRecords, OMIT_FIELDS> {
}
