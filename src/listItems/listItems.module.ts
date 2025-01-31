import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItemsController } from './listItems.controller';
import { ListItemsService } from './listItems.service';
import { ListItem } from './entities/listItem.entity';
import { List } from 'src/lists/entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListItem, List])],
  controllers: [ListItemsController],
  providers: [ListItemsService],
})
export class ListItemsModule {}
