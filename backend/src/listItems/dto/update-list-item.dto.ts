import { Transform } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsBoolean,
    IsOptional,
  } from 'class-validator';
  
  
  export class UpdateListItemDto {
    
    @IsString()
    @MinLength(2, { message: 'Text must have atleast 2 characters.' })
    @MaxLength(100, {message: "Text cannot be more than 100 characters."})
    @IsOptional()
    text: string;

    @IsBoolean()
    @Transform(({value}) => value === 'true')
    @IsOptional()
    isChecked: Boolean;

  }