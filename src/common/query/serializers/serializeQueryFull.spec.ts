import { parse } from 'querystring';

import { QueryAllFilterOperation } from '../types/QueryAllFilterOperation';
import { serializeQueryFull } from './serializeQueryFull';

describe('serializeQueryFull', () => {
  it('should parse full query', () => {
    const params = {
      take: 10,
      skip: 0,
      search: 'Строка поиска',
      relations: ['users', 'accounts'],
      sort: {
        createdAt: 1,
        updatedAt: -1,
      },
      where: {
        name: {
          field: 'name',
          operation: QueryAllFilterOperation.eq,
          value: 'Имя пользователя',
        },
        rating: {
          field: 'rating',
          operation: QueryAllFilterOperation.gt,
          value: '10',
        },
      },
    };

    const query = {
      take: '10',
      skip: '0',
      search: 'Строка поиска',
      relations: 'users,accounts',
      sort: 'asc(createdAt),desc(updatedAt)',
      where: 'eq(name,Имя пользователя);gt(rating,10)',
    };

    const serializedQuery = parse(serializeQueryFull(params));

    expect(serializedQuery).toEqual(query);
  });
});
