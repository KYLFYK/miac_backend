import {ApiProperty} from "@nestjs/swagger";
import {RecordsResponseDto} from "../../records/dto/RecordsResponseDto";
import {Type} from "class-transformer";

export class GetManyRecordsByOwnerDto {
  @ApiProperty({
    type: RecordsResponseDto,
    isArray: true
  })
  @Type(() => RecordsResponseDto)
  items: RecordsResponseDto[]
}
