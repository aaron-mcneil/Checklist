import { Transform } from 'class-transformer';
import {
    IsEnum,
    IsBoolean,
    IsString,
    IsOptional,
  } from 'class-validator';

  export enum ListItemsOrderBy {
    MODIFIED_AT = 'modified_at',
    CREATED_AT = 'created_at',
    TEXT = 'text',
    IS_CHECKED = 'is_checked'
  }
  
  
  export class GetListItemsDto {
    
    @IsEnum(ListItemsOrderBy)
    orderBy: ListItemsOrderBy = ListItemsOrderBy.CREATED_AT;

    @IsBoolean()
    @Transform(({value}) => value === 'true')
    isAscending: Boolean = true

    @IsString()
    @IsOptional()
    text: string
  }