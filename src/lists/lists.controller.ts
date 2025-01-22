import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { UpdateListDto } from './dto/update-list.dto';
import { GetListsDto } from './dto/get-lists.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @UsePipes(new ValidationPipe({transform: true}))
  async getLists(@Query() getListsDto: GetListsDto): Promise<List[]> { 
    const {orderBy, isAscending, name} = getListsDto
    return await this.listsService.getMany(orderBy, isAscending, name);
  }

  @Get(':id')
  async getListById(@Param('id') id: string): Promise<List> | null { 
    return await this.listsService.getById(id)
  }

  @Patch(':id')
  async updateListById(@Param('id') id: string, @Body() updateListDto: UpdateListDto): Promise<List> | null {
    const {name} = updateListDto
    return await this.listsService.updateById(id, name)
  }

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return await this.listsService.createList(createListDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.listsService.deleteById(id)
  }
}
