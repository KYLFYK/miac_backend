import { IBaseEntity } from '../../common/interfaces/IBaseEntity';
import {IDoctor} from "../../doctor/interfaces/IDoctor";

export interface IRecommend extends IBaseEntity {
  name: string;
  description: string;
}
