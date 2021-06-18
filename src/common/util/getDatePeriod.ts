import { QueryDateFilterOperation } from '../query/types/QueryDateFilterOperation';
import { roundUpDateToSeconds } from './roundUpDateToSeconds';

export function getDatePeriod(date: string, period: QueryDateFilterOperation): [Date, Date] {
  const startDate = new Date(date);
  // NOTE: округлить до следующей секунды, чтобы избежать проблем с разной точностью миллисекунд
  const endDate = roundUpDateToSeconds(startDate);

  switch (period) {
    case QueryDateFilterOperation.day:
      startDate.setDate(startDate.getDate() - 1);
      break;
    case QueryDateFilterOperation.week:
      startDate.setDate(startDate.getDate() - 7);
      break;
    case QueryDateFilterOperation.month:
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case QueryDateFilterOperation.quarter:
      startDate.setMonth(startDate.getMonth() - 3);
      break;
    case QueryDateFilterOperation.year:
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
  }

  return [startDate, endDate];
}
