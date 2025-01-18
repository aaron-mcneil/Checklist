import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/entities/list.entity';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [List],
    synchronize: true,
    autoLoadEntities: true,
    }),
    ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
