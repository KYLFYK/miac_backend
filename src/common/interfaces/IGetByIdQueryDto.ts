import { QueryField } from '../query/types/QueryField';

export interface IGetByIdQueryDto {
  [QueryField.relations]: string[];
}
