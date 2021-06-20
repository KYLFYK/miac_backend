import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IChronic } from './IChronic';

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IChronicUpdateData extends Omit<IChronic, OMIT_FIELDS> {
}
