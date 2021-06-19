import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IActivity } from './IActivity';

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IActivityCreateData extends Omit<IActivity, OMIT_FIELDS> {
}
