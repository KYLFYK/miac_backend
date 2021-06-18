export interface IGetManyResponseDto<ItemDto> {
  items: ItemDto[];
  meta: {
    count: number;
  };
}
