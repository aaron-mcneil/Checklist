import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ListsService } from './lists.service';
import { Request } from 'express';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  getLists(): Promise<List[]> { 
    return this.listsService.getAll();
  }

  @Get(':id')
  getListById(@Param('id') id: string): Promise<List> | null { 
    return this.listsService.getById(id)
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.createList(createListDto)
  }
}
