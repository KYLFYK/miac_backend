import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import { IRecommend } from './IRecommend';

type OMIT_FIELDS = keyof IBaseEntity
// | 'somefield'
;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecommendCreateData extends Omit<IRecommend, OMIT_FIELDS> {
}
