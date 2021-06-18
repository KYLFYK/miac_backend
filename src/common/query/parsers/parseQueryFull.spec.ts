import { stringify } from 'querystring';

import { parseQueryFull } from './parseQueryFull';

describe('parseQueryFull', () => {
  it('should parse full query', () => {
    const query = stringify({
      take: 10,
      skip: 0,
      search: 'Строка поиска',
      relations: 'users,accounts',
      sort: 'asc(createdAt),desc(updatedAt)',
      where: 'eq(name,Имя пользователя);gt(rating,10)',
    });

    const parsed = parseQueryFull(query);

    expect(parsed).toEqual({
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
          operation: 'eq',
          value: 'Имя пользователя',
        },
        rating: {
          field: 'rating',
          operation: 'gt',
          value: '10',
        },
      },
    });
  });

  it('should parse empty query', () => {
    const parsed = parseQueryFull('');

    expect(parsed).toEqual({
      take: null,
      skip: null,
      search: '',
      relations: [],
      sort: {},
      where: {},
    });
  });

  it('should preserve unknown query params', () => {
    const query = stringify({
      param1: '1',
      param2: 'Строка',
    });

    const parsed = parseQueryFull(query);

    expect(parsed).toEqual({
      param1: '1',
      param2: 'Строка',
      take: null,
      skip: null,
      search: '',
      relations: [],
      sort: {},
      where: {},
    });
  });

  it('should omit wrong values', () => {
    const query = stringify({
      take: 'десять',
      skip: 'ноль',
      where: 'test',
      sort: 'test',
    });

    const parsed = parseQueryFull(query);

    expect(parsed).toEqual({
      take: null,
      skip: null,
      search: '',
      relations: [],
      sort: {},
      where: {},
    });
  });
});
