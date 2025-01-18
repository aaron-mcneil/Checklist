import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ListsService } from './lists.service';
import { Request } from 'express';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { UpdateListDto } from './dto/update-list.dto';

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

  @Patch(':id')
  async updateListById(@Param('id') id: string, @Body() updateListDto: UpdateListDto): Promise<List> | null {
    const {name} = updateListDto
    return await this.listsService.updateById(id, name)
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.createList(createListDto)
  }
}
