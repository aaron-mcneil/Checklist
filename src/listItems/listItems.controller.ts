import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListItemsService } from './listItems.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { ListItem } from './entities/listItem.entity';
import { UpdateListItemDto } from './dto/update-list-item.dto';
import { GetListItemsDto } from './dto/get-list-items.dto';

@Controller('listItems')
export class ListItemsController {
  constructor(private readonly listItemsService: ListItemsService) {}

    @Get(':id')
    async getById(@Param('id') id: string): Promise<ListItem> | null { 
      return await this.listItemsService.getById(id)
    }

    @Get('/lists/:listId')
    @UsePipes(new ValidationPipe({transform: true}))
    async getMany(@Param('listId') listId: string, @Query() getListsDto: GetListItemsDto): Promise<ListItem[]> { 
      const {orderBy, isAscending, text} = getListsDto
      return await this.listItemsService.getMany(listId, orderBy, isAscending, text)
    }

    @Post()
    async create(@Body() createListItemDto: CreateListItemDto): Promise<ListItem> {
      return await this.listItemsService.create(createListItemDto)
    }

    @Patch(':id')
    async updateById(@Param('id') id: string, @Body() updateListItemDto: UpdateListItemDto): Promise <ListItem> {
      const {text, isChecked} = updateListItemDto
      return await this.listItemsService.updateById(id, text, isChecked)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
      return await this.listItemsService.deleteById(id)
    }
}
