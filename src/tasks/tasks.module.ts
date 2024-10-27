import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ListsModule } from 'src/lists/lists.module';
import { List } from 'src/lists/lists.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    TypeOrmModule.forFeature([Task, List]),
    AuthModule,
    ListsModule
  ],
  exports: [TasksService]
})
export class TasksModule {}
