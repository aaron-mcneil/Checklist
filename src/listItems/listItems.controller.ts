import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListItemsService } from './listItems.service';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { ListItem } from './entities/listItem.entity';

@Controller('listItems')
export class ListItemsController {
  constructor(private readonly listItemsService: ListItemsService) {}

    @Get(':id')
    async getById(@Param('id') id: string): Promise<ListItem> | null { 
      return await this.listItemsService.getById(id)
    }

    @Post()
    async create(@Body() createListItemDto: CreateListItemDto): Promise<ListItem> {
      return await this.listItemsService.create(createListItemDto)
    }

}
