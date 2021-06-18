import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IDoctor } from './IDoctor';

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDoctorCreateData extends Omit<IDoctor, OMIT_FIELDS> {
}
