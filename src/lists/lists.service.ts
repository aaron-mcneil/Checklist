import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ListsOrderBy } from './dto/get-lists.dto';

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ){}

  async getMany(orderBy: ListsOrderBy, isAscending: Boolean, name: string | undefined): Promise<List[]> {

    let conditions: FindManyOptions<List> = {}
    const ascendingValue: 'ASC' | 'DESC' = isAscending ? 'ASC': 'DESC'

    switch(orderBy) {
      case ListsOrderBy.CREATED_AT: {
        conditions.order = {'created_at': ascendingValue}
        break;
      }
      case ListsOrderBy.MODIFIED_AT: {
        conditions.order = {'modified_at': ascendingValue}
        break;
      }
      case ListsOrderBy.NAME: {
        conditions.order = {'name': ascendingValue}
        break;
      }
      default: {
        conditions.order = {'modified_at': ascendingValue}
        break;
      }
    }

    if(name) conditions.where = {name: Like(`%${name}%`)}

    return await this.listRepository.find({...conditions});
  }

  async getById(id: string): Promise<List> | null {
    return await this.listRepository.findOneBy({list_id: id})
  }

  async updateById(id: string, name: string): Promise<List> | null {

    await this.listRepository.update({list_id: id}, {name})

    return this.listRepository.findOneBy({list_id: id})
  }

  async create(createListDto: CreateListDto): Promise<List> {
    const list: List = new List();
    list.name = createListDto.name;
    list.list_id = nanoid()
    return await this.listRepository.save(list)
  }

  async deleteById(id: string): Promise<void> {
    await this.listRepository.delete({list_id: id})
  }
}
