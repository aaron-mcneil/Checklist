import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListsService {

  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ){}

  getAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  getById(id): Promise<List> | null {
    return this.listRepository.findOneBy({list_id: id})

  }

  createList(createListDto: CreateListDto): Promise<List> {
    const list: List = new List();
    list.name = createListDto.name;
    list.list_id = nanoid()
    return this.listRepository.save(list)
  }
}
