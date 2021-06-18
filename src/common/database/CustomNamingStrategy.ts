/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */
import { words } from 'lodash';
import { Table } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { snakeCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy extends SnakeNamingStrategy {
  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return snakeCase(firstTableName + '_to_' + secondTableName);
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    const out = alias + '_' + propertyPath.replace('.', '_');
    const match = out.match(/_/g) || [];

    return out + match.length;
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string, referencedColumnNames?: string[]): string {
    return createKey('FK', tableOrName, columnNames);
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    return createKey('PK', tableOrName, columnNames);
  }

  indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
    const parts = [...columnNames];

    if (where) {
      parts.push(where);
    }

    return createKey('IDX', tableOrName, parts);
  }
}

function createKey(prefix: string, tableOrName: Table | string, columnNames: string[]): string {
  const clonedColumnNames = [...columnNames];
  const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
  const replacedTableName = makeAbbr(tableName);

  clonedColumnNames.sort();

  return [prefix, replacedTableName, ...clonedColumnNames, Date.now()].join('_').toLowerCase();
}

function makeAbbr(value: string): string {
  return words(value).map(s => s[0]).join('');
}
