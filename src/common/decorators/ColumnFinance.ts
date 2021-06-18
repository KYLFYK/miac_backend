import { Column, ColumnOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ColumnFinance(options?: Omit<ColumnOptions, 'type' | 'precision' | 'scale'>): PropertyDecorator {
  return Column({
    ...options,
    type: 'decimal',
    precision: 18,
    scale: 8,
    transformer: {
      to(value: number): number {
        return value;
      },
      from(value: string): number {
        return parseFloat(value);
      },
    },
  });
}
