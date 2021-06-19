import {ApiQuery} from "@nestjs/swagger";

export class QueryDto {
  take: number;
  limit: number;
  dateStart: Date;
  dateEnd: Date;
}
