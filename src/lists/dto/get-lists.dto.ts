import { Transform } from 'class-transformer';
import {
    IsEnum,
    IsBoolean,
    IsString,
    IsOptional,
  } from 'class-validator';

  export enum ListsOrderBy {
    MODIFIED_AT = 'modified_at',
    CREATED_AT = 'created_at',
    NAME = 'name'
  }
  
  
  export class GetListsDto {
    
    @IsEnum(ListsOrderBy)
    orderBy: ListsOrderBy = ListsOrderBy.MODIFIED_AT;

    @IsBoolean()
    @Transform(({value}) => value === 'true')
    isAscending: Boolean = false

    @IsString()
    @IsOptional()
    name: string
  }