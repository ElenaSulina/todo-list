import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './lists.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ListsService],
  controllers: [ListsController],
  imports: [
    TypeOrmModule.forFeature([List]),
    AuthModule
  ],
  exports: [ListsService]
})
export class ListsModule {}
