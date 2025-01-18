import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ListsService } from './list.service';
import { Request } from 'express';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  getLists(@Req() request: Request): string {
    return 'all lists';
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.createList(createListDto)
  }
}
