import { Between, ColumnType, Equal, FindConditions, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Raw } from 'typeorm';
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

import { IQueryFilter } from './interfaces/IQueryFilter';
import { IEntityMetadata } from './interfaces/IEntityMetadata';

import { QueryDateFilterOperation } from './types/QueryDateFilterOperation';
import { QueryAllFilterOperation } from './types/QueryAllFilterOperation';

import { getDatePeriod } from '../util/getDatePeriod';
import { getEntityColumnMetadata } from './getEntityColumnMetadata';
import { roundUpDateToSeconds } from '../util/roundUpDateToSeconds';

type IOperationTransformation = {
  [key in keyof typeof QueryAllFilterOperation]: <Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata) => FindConditions<Entity>;
};

const integerColumnTypes: ColumnType[] = [
  'int', 'integer', 'tinyint', 'smallint', 'mediumint', 'bigint',
];

const floatColumnTypes: ColumnType[] = [
  'float', 'double', 'decimal', 'fixed', 'numeric',
];

const dateColumTypes: ColumnType[] = [
  'timestamp', 'datetime', 'date', 'time',
];

const dateColumnModes = [
  'createDate',
  'updateDate',
];

export function castValue<Entity>(value: string, columnMetadata: ColumnMetadataArgs): any {
  if (integerColumnTypes.includes(columnMetadata.options.type)) {
    return parseInt(value, 10);
  }

  if (floatColumnTypes.includes(columnMetadata.options.type)) {
    return parseFloat(value);
  }

  if (dateColumTypes.includes(columnMetadata.options.type) || dateColumnModes.includes(columnMetadata.mode)) {
    const date = new Date(value);

    return roundUpDateToSeconds(date);
  }

  return value as unknown as Entity[keyof Entity];
}

export function castToArray<Entity>(rawValue: string, columnMetadata: ColumnMetadataArgs): Entity[keyof Entity][] {
  const values = (rawValue || '').split(',').filter(Boolean);

  return values.map(value => castValue(value, columnMetadata)) as unknown as (Entity[keyof Entity])[];
}

const transformations: IOperationTransformation = {
  in<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    if (columnMetadata && columnMetadata.mode === 'regular' && columnMetadata.options.array) {
      return {
        [item.field]: Raw(columnAlias => `${columnAlias} @> ARRAY[${castToArray(item.value, columnMetadata)}]`),
      } as unknown as FindConditions<Entity>;
    }

    return { [item.field]: In(castToArray(item.value, columnMetadata)) } as unknown as FindConditions<Entity>;
  },

  nin<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: Not(In(castToArray(item.value, columnMetadata))) } as unknown as FindConditions<Entity>;
  },

  eq<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: Equal(castValue(item.value, columnMetadata)) } as unknown as FindConditions<Entity>;
  },

  neq<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: Not(Equal(castValue(item.value, columnMetadata))) } as unknown as FindConditions<Entity>;
  },

  gt<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: MoreThan(castValue(item.value, columnMetadata)) } as unknown as FindConditions<Entity>;
  },

  gte<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: MoreThanOrEqual(castValue(item.value, columnMetadata)) } as unknown as FindConditions<Entity>;
  },

  lt<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: LessThan(castValue(item.value, columnMetadata)) } as unknown as FindConditions<Entity>;
  },

  lte<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);

    return { [item.field]: LessThanOrEqual(castValue(item.value, columnMetadata)) } as unknown as FindConditions<Entity>;
  },

  btw<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);
    const [leftBoundary, rightBoundary] = castToArray(item.value, columnMetadata);

    return { [item.field]: Between(leftBoundary, rightBoundary) } as unknown as FindConditions<Entity>;
  },

  day<Entity>(item: IQueryFilter<Entity>): FindConditions<Entity> {
    const [startDate, endDate] = getDatePeriod(item.value, QueryDateFilterOperation.day);

    return {
      [item.field]: Between(startDate, endDate),
    } as unknown as FindConditions<Entity>;
  },

  week<Entity>(item: IQueryFilter<Entity>): FindConditions<Entity> {
    const [startDate, endDate] = getDatePeriod(item.value, QueryDateFilterOperation.week);

    return {
      [item.field]: Between(startDate, endDate),
    } as unknown as FindConditions<Entity>;
  },

  month<Entity>(item: IQueryFilter<Entity>): FindConditions<Entity> {
    const [startDate, endDate] = getDatePeriod(item.value, QueryDateFilterOperation.month);

    return {
      [item.field]: Between(startDate, endDate),
    } as unknown as FindConditions<Entity>;
  },

  quarter<Entity>(item: IQueryFilter<Entity>): FindConditions<Entity> {
    const [startDate, endDate] = getDatePeriod(item.value, QueryDateFilterOperation.quarter);

    return {
      [item.field]: Between(startDate, endDate),
    } as unknown as FindConditions<Entity>;
  },

  year<Entity>(item: IQueryFilter<Entity>): FindConditions<Entity> {
    const [startDate, endDate] = getDatePeriod(item.value, QueryDateFilterOperation.year);

    return {
      [item.field]: Between(startDate, endDate),
    } as unknown as FindConditions<Entity>;
  },

  period<Entity>(item: IQueryFilter<Entity>, entityMetadata: IEntityMetadata): FindConditions<Entity> {
    const columnMetadata = getEntityColumnMetadata(entityMetadata, item);
    const period = castToArray(item.value, columnMetadata);
    const endDate = period[1] ?? new Date();

    return {
      [item.field]: Between(period[0], endDate),
    } as unknown as FindConditions<Entity>;
  },
};

export function createFindConditionsFromQueryFilter<Entity>(queryFilter: IQueryFilter<Entity>[], entityMetadata: IEntityMetadata): FindConditions<Entity> {
  return queryFilter.map(item => {
    const transform = transformations[item.operation];

    return transform(item, entityMetadata);
  }).reduce((acc, item) => ({ ...acc, ...item }), {});
}
