import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
  } from 'class-validator';
  
  
  export class CreateListItemDto {
    
    @IsString()
    @MinLength(2, { message: 'Text must have atleast 2 characters.' })
    @MaxLength(100, {message: "Text cannot be more than 100 characters."})
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsNotEmpty()
    listId: string;

  }