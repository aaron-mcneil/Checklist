import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
  } from 'class-validator';
  
  
  export class UpdateListDto {
    
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @MaxLength(100, {message: "Name cannot be more than 100 characters."})
    @IsNotEmpty()
    name: string;

  }