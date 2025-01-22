import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ListItem } from './entities/listItem.entity';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { List } from 'src/lists/entities/list.entity';

@Injectable()
export class ListItemsService {

  constructor(
    @InjectRepository(ListItem) private readonly listItemRepository: Repository<ListItem>,
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ){}

    async getById(id: string): Promise<ListItem> | null {
      return await this.listItemRepository.findOneBy({list_item_id: id})
    }

    async create(createListItemDto: CreateListItemDto): Promise<ListItem> {
      const list = await this.listRepository.findOneBy({list_id: createListItemDto.listId})
      const listItem: ListItem = new ListItem();
      listItem.text = createListItemDto.text;
      listItem.list = list
      listItem.list_item_id = nanoid()
      listItem.is_checked = false

      return await this.listItemRepository.save(listItem)
    }
}
