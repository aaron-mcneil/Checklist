import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ListItem } from './entities/listItem.entity';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { List } from 'src/lists/entities/list.entity';
import { ListItemsOrderBy } from './dto/get-list-items.dto';

@Injectable()
export class ListItemsService {

  constructor(
    @InjectRepository(ListItem) private readonly listItemRepository: Repository<ListItem>,
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ){}

    async getById(id: string): Promise<ListItem> | null {
      return await this.listItemRepository.findOneBy({list_item_id: id})
    }

    async getMany(listId: string, orderBy: ListItemsOrderBy, isAscending: Boolean, text: string | undefined): Promise<ListItem[]> {
    let conditions: FindManyOptions<ListItem> = {}
    const ascendingValue: 'ASC' | 'DESC' = isAscending ? 'ASC': 'DESC'

    switch(orderBy) {
      case ListItemsOrderBy.CREATED_AT: {
        conditions.order = {'created_at': ascendingValue}
        break;
      }
      case ListItemsOrderBy.MODIFIED_AT: {
        conditions.order = {'modified_at': ascendingValue}
        break;
      }
      case ListItemsOrderBy.TEXT: {
        conditions.order = {'text': ascendingValue}
        break;
      }
      case ListItemsOrderBy.IS_CHECKED: {
        conditions.order = {'is_checked': ascendingValue}
        break;
      }
      default: {
        conditions.order = {'created_at': ascendingValue}
        break;
      }
    }

    let where = {}

    where = {list: {list_id: listId}}

    if(text) where = {...where, text: Like(`%${text}%`)}

    conditions.where = where

    return await this.listItemRepository.find({...conditions});
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

    async updateById(id: string, text: string | undefined, isChecked: Boolean | undefined): Promise<ListItem> {
      let updateBody = {}

      if(text) updateBody = {...updateBody, text}

      if(isChecked !== undefined) updateBody = {...updateBody, is_checked: isChecked}

      await this.listItemRepository.update({list_item_id: id}, updateBody)

      return this.listItemRepository.findOneBy({list_item_id: id})
    }

    async deleteById(id: string): Promise<void> {
      await this.listItemRepository.delete({list_item_id: id})
    }
}
